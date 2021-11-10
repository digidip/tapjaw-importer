import { DateTime, Duration, DurationUnits } from 'luxon';

export default function dateDiff(now: Date, past: Date, period: DurationUnits): Duration {
    return DateTime.fromJSDate(now).diff(DateTime.fromJSDate(past), period);
}
