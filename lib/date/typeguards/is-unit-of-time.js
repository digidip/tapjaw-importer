"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUnitOfTime = (unitOfTime) => {
    return Boolean(typeof unitOfTime === 'string' &&
        unitOfTime.length > 0 &&
        ['day', 'days', 'month', 'months'].includes(unitOfTime));
};
exports.default = isUnitOfTime;
