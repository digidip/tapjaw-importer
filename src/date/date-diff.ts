import { DateTime, Duration, DurationUnits } from 'luxon';

const dateDiff = (now: Date, past: Date, period: DurationUnits): Duration => {
    return DateTime.fromJSDate(now).diff(DateTime.fromJSDate(past), period);
};

export default dateDiff;
