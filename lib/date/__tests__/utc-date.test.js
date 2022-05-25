"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const utc_date_1 = (0, tslib_1.__importDefault)(require("../utc-date"));
describe('Make sure utcDate() creates the dates we want.', () => {
    it('should create a UTC date with 00:00:00 timestamp', () => {
        expect((0, utc_date_1.default)('2021-06-01')).toEqual(new Date('2021-06-01 00:00:00+00:00'));
        expect((0, utc_date_1.default)('2021-06-01', '02:00:00')).toEqual(new Date('2021-06-01 02:00:00+00:00'));
    });
    // it('should generate correct now JS Date object.', () => {
    //     expect(utcDate.now()).toEqual(new Date())
    // });
    it('should correctly parse strings with utcDate.fromDateTime()', () => {
        expect(utc_date_1.default.fromDateTime('2021-01-04 23:59:59.999')).toEqual(new Date(1609804799999));
        expect(utc_date_1.default.fromDateTime('2021-01-04T23:59:59.999')).toEqual(new Date(1609804799999));
        expect(utc_date_1.default.fromDateTime('2021-01-04T23:59:59')).toEqual(new Date(1609804799000));
        expect(utc_date_1.default.fromDateTime('2021-01-04 23:59:59')).toEqual(new Date(1609804799000));
        expect(utc_date_1.default.fromDateTime('2021-01-04T23:59:59.999Z')).toEqual(new Date(1609804799999));
        expect(utc_date_1.default.fromDateTime('2021-01-04T23:59:59Z')).toEqual(new Date(1609804799000));
        expect(utc_date_1.default.fromDateTime('2021-01-04T22:59:59-01:00')).toEqual(new Date(1609804799000));
        expect(utc_date_1.default.fromDateTime('2021-01-04')).toEqual(new Date(1609718400000));
    });
    it('should correctly parse date with utcDate.fromFormat().', () => {
        expect(utc_date_1.default.fromFormat('2021-06-01', constants_1.YYYY_MM_DD)).toEqual(new Date('2021-06-01 00:00:00.000+00:00'));
        expect(utc_date_1.default.fromFormat('2021-06-01 00:00:00', constants_1.DATE_TIME)).toEqual(new Date('2021-06-01 00:00:00.000+00:00'));
        expect(String(utc_date_1.default.fromFormat('2021-06-01', constants_1.YYYY_MM_DD_T_TIME))).toEqual('Invalid Date');
    });
});
