import { DateRange } from './constants';
import { UnitOfTime } from './typeguards/is-unit-of-time';
declare const _default: {
    inbound: (segmentSize: number, period: UnitOfTime, dateRange: DateRange) => Generator<[Date, Date]>;
};
export default _default;
