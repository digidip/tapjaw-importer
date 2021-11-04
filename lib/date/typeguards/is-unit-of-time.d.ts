export declare type UnitOfTime = 'day' | 'days' | 'month' | 'months';
declare const isUnitOfTime: (unitOfTime: unknown) => unitOfTime is UnitOfTime;
export default isUnitOfTime;
