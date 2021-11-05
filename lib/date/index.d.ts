import * as constants from './constants';
declare const _default: {
    constants: typeof constants;
    endOfDate: (date: Date) => Date;
    endOf: (date: Date, period: import("luxon").DateTimeUnit) => Date;
    startOf: (date: Date, period: import("luxon").DateTimeUnit) => Date;
    startOfDate: (date: Date) => Date;
    formatDate: (date: Date, format: string) => string;
    utcDate: {
        (date: string, time?: string): Date;
        fromDateTime(dateTime: string): Date;
        fromFormat(dateTime: string, format: string): Date;
        now(): Date;
        fromMillis(ms: string | number): Date;
        fromUnix(secs: string | number): Date;
        fromEpoch: (secs: string | number) => Date;
    };
    dateDiff: (now: Date, past: Date, period: import("luxon").DurationUnits) => import("luxon").Duration;
    dateAdd: (dateA: Date, value: number, period: import("luxon").DateTimeUnit) => Date;
};
export default _default;
