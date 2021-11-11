import { DateTime, DateTimeUnit } from 'luxon';

export default function dateAdd(dateA: Date, value: number, period: DateTimeUnit): Date {
    return DateTime.fromJSDate(dateA)
        .plus({
            [period]: value,
        })
        .toJSDate();
}
