import { DATE_TIME, YYYY_MM_DD, YYYY_MM_DD_T_TIME } from '../constants';
import utcDate from '../utc-date';

describe('Make sure utcDate() creates the dates we want.', () => {
    it('should create a UTC date with 00:00:00 timestamp', () => {
        expect(utcDate('2021-06-01')).toEqual(new Date('2021-06-01 00:00:00+00:00'));
        expect(utcDate('2021-06-01', '02:00:00')).toEqual(new Date('2021-06-01 02:00:00+00:00'));
    });

    // it('should generate correct now JS Date object.', () => {
    //     expect(utcDate.now()).toEqual(new Date())
    // });

    it('should correctly parse strings with utcDate.fromDateTime()', () => {
        expect(utcDate.fromDateTime('2021-01-04 23:59:59.999')).toEqual(new Date(1609804799999));
        expect(utcDate.fromDateTime('2021-01-04T23:59:59.999')).toEqual(new Date(1609804799999));
        expect(utcDate.fromDateTime('2021-01-04T23:59:59')).toEqual(new Date(1609804799000));
        expect(utcDate.fromDateTime('2021-01-04 23:59:59')).toEqual(new Date(1609804799000));

        expect(utcDate.fromDateTime('2021-01-04T23:59:59.999Z')).toEqual(new Date(1609804799999));
        expect(utcDate.fromDateTime('2021-01-04T23:59:59Z')).toEqual(new Date(1609804799000));
        expect(utcDate.fromDateTime('2021-01-04T22:59:59-01:00')).toEqual(new Date(1609804799000));

        expect(utcDate.fromDateTime('2021-01-04')).toEqual(new Date(1609718400000));
    });

    it('should correctly parse date with utcDate.fromFormat().', () => {
        expect(utcDate.fromFormat('2021-06-01', YYYY_MM_DD)).toEqual(new Date('2021-06-01 00:00:00.000+00:00'));
        expect(utcDate.fromFormat('2021-06-01 00:00:00', DATE_TIME)).toEqual(new Date('2021-06-01 00:00:00.000+00:00'));

        expect(String(utcDate.fromFormat('2021-06-01', YYYY_MM_DD_T_TIME))).toEqual('Invalid Date');
    });
});
