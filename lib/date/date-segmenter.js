"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inbound = void 0;
const tslib_1 = require("tslib");
const date_add_1 = tslib_1.__importDefault(require("./date-add"));
const date_diff_1 = tslib_1.__importDefault(require("./date-diff"));
const end_of_date_1 = tslib_1.__importDefault(require("./end-of-date"));
const start_of_1 = tslib_1.__importDefault(require("./start-of"));
/* Inbound days segmentation of two YYYY-MM-DD dates.
/
/  Dates will be segmented using an inbound date/time check between
/  2021-06-01 00:00:00.000 and 2021-06-02 23:59:59.999 (2 days - 1millisecond, inbound).
/
/ e.g.: segment by 2 days, 2021-06-01 -> 2021-06-02 =
/       [ [2021-06-01, 2021-06-02] ]
/
/ e.g.: segment by 2 days, 2021-06-01 -> 2021-06-03 =
/       [ [2021-06-01, 2021-06-02], [2021-06-03, 2021-06-03] ]
/
/ e.g.: segment by 2 days, 2021-06-01 -> 2021-06-04 =
/       [ [2021-06-01, 2021-06-02], [2021-06-03, 2021-06-04] ]
/
/ e.g.: segment by 2 days, 2021-06-01 -> 2021-06-05 =
/       [ [2021-06-01, 2021-06-02], [2021-06-03, 2021-06-04], [2021-06-05, 2021-06-05] ]
*/
const inboundDays = function* (segmentSize, dateRange) {
    const start = (0, start_of_1.default)(dateRange.startDate, 'day');
    // !!! Important !!! we must always end on the date only, never the month.
    const end = (0, end_of_date_1.default)(dateRange.endDate);
    const diff = (0, date_diff_1.default)(end, start, 'days').toObject();
    let pool = diff['days'];
    let inc = 0;
    while (pool > 0) {
        const currStart = (0, date_add_1.default)(start, inc, 'day');
        const currEnd = (0, date_add_1.default)((0, date_add_1.default)(currStart, -1, 'millisecond'), segmentSize, 'day');
        yield [currStart, end < currEnd ? end : currEnd];
        pool -= segmentSize;
        inc += segmentSize;
    }
};
/* Inbound months segmentation of two YYYY-MM-DD dates.
/
/  Dates will be segmented using an inbound date/time check between
/  2021-06-01 00:00:00.000 and 2021-08-01 23:59:59.999 (2 months, inbound).
/
/ e.g.: segment by 2 months, 2021-06-01 -> 2021-08-01 =
/       [ [2021-06-01, 2021-08-01] ]
/
/ e.g.: segment by 2 months, 2021-06-01 -> 2021-09-15 =
/       [ [2021-06-01, 2021-08-01], [2021-08-02, 2021-09-15] ]
/
/ e.g.: segment by 2 months, 2021-06-01 -> 2021-10-01 =
/       [ [2021-06-01, 2021-08-01], [2021-08-02, 2021-10-01] ]
/
/ e.g.: segment by 2 months, 2021-06-01 -> 2021-11-01 =
/       [ [2021-06-01, 2021-08-01], [2021-08-02, 2021-10-01], [2021-10-02, 2021-11-01] ]
*/
const inboundMonths = function* (segmentSize, dateRange) {
    const start = (0, start_of_1.default)(dateRange.startDate, 'day');
    const end = (0, end_of_date_1.default)(dateRange.endDate);
    const diff = (0, date_diff_1.default)(end, start, 'months').toObject();
    let pool = diff['months'];
    let inc = 0;
    while (pool > 0) {
        let currStart = (0, date_add_1.default)(start, inc, 'month');
        let currEnd = (0, date_add_1.default)((0, date_add_1.default)(currStart, segmentSize, 'month'), -1, 'millisecond');
        if (currEnd.getUTCHours() !== 23) {
            currEnd = (0, date_add_1.default)(currEnd, 1, 'hour');
        }
        if (currStart.getUTCHours() !== 0) {
            currStart = (0, date_add_1.default)(currStart, 1, 'hour');
        }
        yield [currStart, end < currEnd ? end : currEnd];
        pool -= segmentSize;
        inc += segmentSize;
    }
};
function* inbound(segmentSize, period, dateRange) {
    if (period === 'days' || period === 'day') {
        yield* inboundDays(segmentSize, dateRange);
    }
    if (period === 'months' || period === 'month') {
        yield* inboundMonths(segmentSize, dateRange);
    }
}
exports.inbound = inbound;
