import { DateTime } from 'luxon';
import { REGEX_DATE_ISO8601, REGEX_DATE_YYYY_MM_DD } from './constants';

export function utcDate(date: string, time = '00:00:00'): Date {
    return new Date(`${date} ${time} UTC`);
}

export function fromDateTime(dateTime: string): Date {
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
}

export function fromFormat(dateTime: string, format: string): Date {
    return DateTime.fromFormat(dateTime, format, { zone: 'UTC' }).toJSDate();
}

export function now() {
    return new Date();
}

export function fromMillis(ms: number | string): Date {
    return DateTime.fromMillis(Number(ms)).toJSDate();
}

export function fromUnix(secs: number | string): Date {
    return DateTime.fromSeconds(Number(secs)).toJSDate();
}

export function fromEpoch(secs: number | string): Date {
    return fromUnix(secs);
}

utcDate.fromDateTime = fromDateTime;
utcDate.fromFormat = fromFormat;
utcDate.now = now;
utcDate.fromMillis = fromMillis;
utcDate.fromUnix = fromUnix;
utcDate.fromEpoch = fromEpoch;

export default utcDate;
