import { DateTime, DateTimeUnit } from 'luxon';

export default function endOf(date: Date, period: DateTimeUnit): Date {
    return DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .endOf(period)
        .toJSDate();
}
