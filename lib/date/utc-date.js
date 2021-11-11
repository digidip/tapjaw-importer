"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEpoch = exports.fromUnix = exports.fromMillis = exports.now = exports.fromFormat = exports.fromDateTime = exports.utcDate = void 0;
const luxon_1 = require("luxon");
const constants_1 = require("./constants");
function utcDate(date, time = '00:00:00') {
    return new Date(`${date} ${time} UTC`);
}
exports.utcDate = utcDate;
function fromDateTime(dateTime) {
    switch (true) {
        case constants_1.REGEX_DATE_YYYY_MM_DD.test(dateTime):
            return new Date(`${dateTime} 00:00:00 UTC`);
        case constants_1.REGEX_DATE_ISO8601.test(dateTime):
            return luxon_1.DateTime.fromISO(dateTime).toJSDate();
        case dateTime.includes('T') && dateTime.includes('Z'):
            return luxon_1.DateTime.fromISO(`${dateTime}`).toJSDate();
        case !dateTime.includes('T') && !dateTime.includes('Z'):
            return luxon_1.DateTime.fromSQL(`${dateTime} UTC`).toJSDate();
        case dateTime.includes('T'):
            return utcDate(dateTime.split('T')[0], dateTime.split('T')[1]);
        default:
            return new Date(`${dateTime} UTC`);
    }
}
exports.fromDateTime = fromDateTime;
function fromFormat(dateTime, format) {
    return luxon_1.DateTime.fromFormat(dateTime, format, { zone: 'UTC' }).toJSDate();
}
exports.fromFormat = fromFormat;
function now() {
    return new Date();
}
exports.now = now;
function fromMillis(ms) {
    return luxon_1.DateTime.fromMillis(Number(ms)).toJSDate();
}
exports.fromMillis = fromMillis;
function fromUnix(secs) {
    return luxon_1.DateTime.fromSeconds(Number(secs)).toJSDate();
}
exports.fromUnix = fromUnix;
function fromEpoch(secs) {
    return fromUnix(secs);
}
exports.fromEpoch = fromEpoch;
utcDate.fromDateTime = fromDateTime;
utcDate.fromFormat = fromFormat;
utcDate.now = now;
utcDate.fromMillis = fromMillis;
utcDate.fromUnix = fromUnix;
utcDate.fromEpoch = fromEpoch;
exports.default = utcDate;
