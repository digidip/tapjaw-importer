import { DateTime, DateTimeUnit } from 'luxon';

const endOf = (date: Date, period: DateTimeUnit): Date =>
    DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .endOf(period)
        .toJSDate();

export default endOf;
