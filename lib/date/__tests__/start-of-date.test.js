"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const start_of_date_1 = (0, tslib_1.__importDefault)(require("../start-of-date"));
describe('Make sure startOfDate() works as expected', () => {
    it('should correctly set the time to 00:00:00 in UTC.', () => {
        expect((0, start_of_date_1.default)(new Date('2021-06-01 02:00:00+02:00'))).toEqual(new Date('2021-06-01 00:00:00+00:00'));
    });
});
