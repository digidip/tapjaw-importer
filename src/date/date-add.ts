import { DateTime, DateTimeUnit } from 'luxon';

const dateAdd = (dateA: Date, value: number, period: DateTimeUnit): Date => {
    return DateTime.fromJSDate(dateA)
        .plus({
            [period]: value,
        })
        .toJSDate();
};

export default dateAdd;
