import { DateTime, DateTimeUnit } from 'luxon';

export default function (date: Date, period: DateTimeUnit): Date {
    return DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .startOf(period)
        .toJSDate();
}
