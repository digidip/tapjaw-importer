declare const utcDate: {
    (date: string, time?: string): Date;
    fromDateTime(dateTime: string): Date;
    fromFormat(dateTime: string, format: string): Date;
    now(): Date;
    fromMillis(ms: number | string): Date;
    fromUnix(secs: number | string): Date;
    fromEpoch: (secs: number | string) => Date;
};
export default utcDate;
