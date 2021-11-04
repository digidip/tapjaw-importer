import { Duration, DurationUnits } from 'luxon';
declare const dateDiff: (now: Date, past: Date, period: DurationUnits) => Duration;
export default dateDiff;
