export declare function utcDate(date: string, time?: string): Date;
export declare namespace utcDate {
    var fromDateTime: typeof import("./utc-date").fromDateTime;
    var fromFormat: typeof import("./utc-date").fromFormat;
    var now: typeof import("./utc-date").now;
    var fromMillis: typeof import("./utc-date").fromMillis;
    var fromUnix: typeof import("./utc-date").fromUnix;
    var fromEpoch: typeof import("./utc-date").fromEpoch;
}
export declare function fromDateTime(dateTime: string): Date;
export declare function fromFormat(dateTime: string, format: string): Date;
export declare function now(): Date;
export declare function fromMillis(ms: number | string): Date;
export declare function fromUnix(secs: number | string): Date;
export declare function fromEpoch(secs: number | string): Date;
export default utcDate;
