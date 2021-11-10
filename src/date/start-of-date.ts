import { DateTime } from 'luxon';

export default function startOfDate(date: Date): Date {
    return DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .startOf('day')
        .toJSDate();
}
