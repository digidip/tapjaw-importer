export type UnitOfTime = 'day' | 'days' | 'month' | 'months';

const isUnitOfTime = (unitOfTime: unknown): unitOfTime is UnitOfTime => {
    return Boolean(
        typeof unitOfTime === 'string' &&
            unitOfTime.length > 0 &&
            ['day', 'days', 'month', 'months'].includes(unitOfTime)
    );
};

export default isUnitOfTime;
