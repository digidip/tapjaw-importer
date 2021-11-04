"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const constants_1 = require("./constants");
const utcDate = (date, time = '00:00:00') => new Date(`${date} ${time} UTC`);
utcDate.fromDateTime = (dateTime) => {
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
};
utcDate.fromFormat = (dateTime, format) => {
    return luxon_1.DateTime.fromFormat(dateTime, format, { zone: 'UTC' }).toJSDate();
};
utcDate.now = () => new Date();
utcDate.fromMillis = (ms) => luxon_1.DateTime.fromMillis(Number(ms)).toJSDate();
utcDate.fromUnix = (secs) => luxon_1.DateTime.fromSeconds(Number(secs)).toJSDate();
utcDate.fromEpoch = utcDate.fromUnix;
exports.default = utcDate;
