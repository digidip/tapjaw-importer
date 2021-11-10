import { DateTime } from 'luxon';

export default function formatDate(date: Date, format: string): string {
    return DateTime.fromJSDate(date, {
        zone: 'UTC',
    }).toFormat(format);
}
