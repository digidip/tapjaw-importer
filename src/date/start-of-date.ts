import { DateTime } from 'luxon';

const startOfDate = (date: Date): Date => DateTime.fromJSDate(date, {
    zone: 'UTC',
}).startOf('day').toJSDate();

export default startOfDate;
