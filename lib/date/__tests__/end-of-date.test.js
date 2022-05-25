"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const end_of_date_1 = (0, tslib_1.__importDefault)(require("../end-of-date"));
describe('Make sure endOfDate() works as expected', () => {
    it('should correctly set the time to 00:00:00 in UTC.', () => {
        expect((0, end_of_date_1.default)(new Date('2021-06-01 02:00:00+02:00'))).toEqual(new Date('2021-06-01 23:59:59.999+00:00'));
        expect((0, end_of_date_1.default)(new Date('2021-06-01 23:00:00+02:00'))).toEqual(new Date('2021-06-01 23:59:59.999+00:00'));
    });
});
