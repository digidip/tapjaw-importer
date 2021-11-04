import { DateTime } from 'luxon';

const formatDate = (date: Date, format: string): string => DateTime.fromJSDate(date, {
    zone: 'UTC',
}).toFormat(format);

export default formatDate;
