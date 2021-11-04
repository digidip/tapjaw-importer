import { DateTime, DateTimeUnit } from 'luxon';

const startOf = (date: Date, period: DateTimeUnit): Date =>
    DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .startOf(period)
        .toJSDate();

export default startOf;
