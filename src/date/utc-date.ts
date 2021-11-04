import { DateTime } from 'luxon';
import { REGEX_DATE_ISO8601, REGEX_DATE_YYYY_MM_DD } from './constants';

const utcDate = (date: string, time = '00:00:00'): Date => new Date(`${date} ${time} UTC`);

utcDate.fromDateTime = (dateTime: string): Date => {
    switch (true) {
        case REGEX_DATE_YYYY_MM_DD.test(dateTime):
            return new Date(`${dateTime} 00:00:00 UTC`);
        case REGEX_DATE_ISO8601.test(dateTime):
            return DateTime.fromISO(dateTime).toJSDate();
        case dateTime.includes('T') && dateTime.includes('Z'):
            return DateTime.fromISO(`${dateTime}`).toJSDate();
        case !dateTime.includes('T') && !dateTime.includes('Z'):
            return DateTime.fromSQL(`${dateTime} UTC`).toJSDate();
        case dateTime.includes('T'):
            return utcDate(dateTime.split('T')[0], dateTime.split('T')[1]);
        default:
            return new Date(`${dateTime} UTC`);
    }
};

utcDate.fromFormat = (dateTime: string, format: string): Date => {
    return DateTime.fromFormat(dateTime, format, { zone: 'UTC' }).toJSDate();
};

utcDate.now = () => new Date();

utcDate.fromMillis = (ms: number | string): Date => DateTime.fromMillis(Number(ms)).toJSDate();
utcDate.fromUnix = (secs: number | string): Date => DateTime.fromSeconds(Number(secs)).toJSDate();
utcDate.fromEpoch = utcDate.fromUnix;

export default utcDate;
