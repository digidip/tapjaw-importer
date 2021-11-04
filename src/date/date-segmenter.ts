import { DateRange } from './constants';
import dateAdd from './date-add';
import dateDiff from './date-diff';
import endOfDate from './end-of-date';
import startOf from './start-of';
import { UnitOfTime } from './typeguards/is-unit-of-time';

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
const inboundDays = function* (segmentSize: number, dateRange: DateRange): Generator<[Date, Date]> {
    const start = startOf(dateRange.startDate, 'day');
    // !!! Important !!! we must always end on the date only, never the month.
    const end = endOfDate(dateRange.endDate);

    const diff = dateDiff(end, start, 'days').toObject();

    let pool = diff['days'] as number;
    let inc = 0;
    while (pool > 0) {
        const currStart = dateAdd(start, inc, 'day');
        const currEnd = dateAdd(dateAdd(currStart, -1, 'millisecond'), segmentSize, 'day');

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
const inboundMonths = function* (segmentSize: number, dateRange: DateRange): Generator<[Date, Date]> {
    const start = startOf(dateRange.startDate, 'day');
    const end = endOfDate(dateRange.endDate);

    const diff = dateDiff(end, start, 'months').toObject();

    let pool = diff['months'] as number;
    let inc = 0;
    while (pool > 0) {
        let currStart = dateAdd(start, inc, 'month');
        let currEnd = dateAdd(dateAdd(currStart, segmentSize, 'month'), -1, 'millisecond');

        if (currEnd.getUTCHours() !== 23) {
            currEnd = dateAdd(currEnd, 1, 'hour');
        }
        if (currStart.getUTCHours() !== 0) {
            currStart = dateAdd(currStart, 1, 'hour');
        }

        yield [currStart, end < currEnd ? end : currEnd];

        pool -= segmentSize;
        inc += segmentSize;
    }
};

export default {
    inbound: function* (segmentSize: number, period: UnitOfTime, dateRange: DateRange): Generator<[Date, Date]> {
        if (period === 'days' || period === 'day') {
            yield* inboundDays(segmentSize, dateRange);
        }

        if (period === 'months' || period === 'month') {
            yield* inboundMonths(segmentSize, dateRange);
        }
    },
};
