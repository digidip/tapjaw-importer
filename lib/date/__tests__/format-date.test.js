"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const format_date_1 = (0, tslib_1.__importDefault)(require("../format-date"));
describe('formatDate() should work as expected', () => {
    it('should output expected Year, Day and month string values', async () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'YYYY')).toEqual('YYYY');
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'yyyy')).toEqual('2021');
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'MM')).toEqual('06');
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'dd')).toEqual('01');
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'Y')).toEqual('Y');
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'y')).toEqual('2021');
        expect((0, format_date_1.default)(new Date('2021-06-01'), 'yy')).toEqual('21');
    });
    it('should correctly format YYYY_MM_DD', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.YYYY_MM_DD)).toEqual('2021-06-01');
    });
    it('should correctly format YYYY_MM_DD_T_TIME', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.YYYY_MM_DD_T_TIME)).toEqual('2021-06-01T00:00:00');
    });
    it('should correctly format YYYY_MM_DD_T_TIME_Z', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.YYYY_MM_DD_T_TIME_Z)).toEqual('2021-06-01T00:00:00Z');
    });
    it('should correctly format DATE_TIME', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.DATE_TIME)).toEqual('2021-06-01 00:00:00');
    });
    it('should correctly format YYYY_MM_DD_T_TIME_OFFSET', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.YYYY_MM_DD_T_TIME_OFFSET)).toEqual('2021-06-01T00:00:00+00:00');
    });
    it('should correctly format YYYY_MM_DD_TIME_OFFSET', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.YYYY_MM_DD_TIME_OFFSET)).toEqual('2021-06-01 00:00:00+00:00');
    });
    it('should correctly format USA_MM_DD_YYYY_DATE', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.USA_MM_DD_YYYY_DATE)).toEqual('06/01/21');
    });
    it('should correctly format UNIX_TIMESTAMP', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.UNIX_TIMESTAMP)).toEqual('1622505600');
    });
    it('should correctly format UNIX_TIMESTAMP', () => {
        expect((0, format_date_1.default)(new Date('2021-06-01'), constants_1.USA_MM_DD_YYYY_DATE_TIME)).toEqual('06/01/21 00:00:00');
    });
});
