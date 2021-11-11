import { DateRange } from './constants';
import { UnitOfTime } from './typeguards/is-unit-of-time';
export declare function inbound(segmentSize: number, period: UnitOfTime, dateRange: DateRange): Generator<[Date, Date]>;
