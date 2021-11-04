import { DATE_TIME, UNIX_TIMESTAMP, USA_MM_DD_YYYY_DATE, USA_MM_DD_YYYY_DATE_TIME, YYYY_MM_DD, YYYY_MM_DD_TIME_OFFSET, YYYY_MM_DD_T_TIME, YYYY_MM_DD_T_TIME_OFFSET, YYYY_MM_DD_T_TIME_Z } from "../index";
import formatDate from "../format-date";

describe('formatDate() should work as expected', () => {
    it('should output expected Year, Day and month string values', async () => {
        expect(formatDate(new Date('2021-06-01'), 'YYYY')).toEqual('YYYY');
        expect(formatDate(new Date('2021-06-01'), 'yyyy')).toEqual('2021');
        expect(formatDate(new Date('2021-06-01'), 'MM')).toEqual('06');
        expect(formatDate(new Date('2021-06-01'), 'dd')).toEqual('01');
        expect(formatDate(new Date('2021-06-01'), 'Y')).toEqual('Y');
        expect(formatDate(new Date('2021-06-01'), 'y')).toEqual('2021');
        expect(formatDate(new Date('2021-06-01'), 'yy')).toEqual('21');
    });

    it('should correctly format YYYY_MM_DD', () => {
        expect(formatDate(new Date('2021-06-01'), YYYY_MM_DD)).toEqual('2021-06-01');
    });

    it('should correctly format YYYY_MM_DD_T_TIME', () => {
        expect(formatDate(new Date('2021-06-01'), YYYY_MM_DD_T_TIME)).toEqual('2021-06-01T00:00:00');
    });

    it('should correctly format YYYY_MM_DD_T_TIME_Z', () => {
        expect(formatDate(new Date('2021-06-01'), YYYY_MM_DD_T_TIME_Z)).toEqual('2021-06-01T00:00:00Z');
    });

    it('should correctly format DATE_TIME', () => {
        expect(formatDate(new Date('2021-06-01'), DATE_TIME)).toEqual('2021-06-01 00:00:00');
    });

    it('should correctly format YYYY_MM_DD_T_TIME_OFFSET', () => {
        expect(formatDate(new Date('2021-06-01'), YYYY_MM_DD_T_TIME_OFFSET)).toEqual('2021-06-01T00:00:00+00:00');
    });

    it('should correctly format YYYY_MM_DD_TIME_OFFSET', () => {
        expect(formatDate(new Date('2021-06-01'), YYYY_MM_DD_TIME_OFFSET)).toEqual('2021-06-01 00:00:00+00:00');
    });

    it('should correctly format USA_MM_DD_YYYY_DATE', () => {
        expect(formatDate(new Date('2021-06-01'), USA_MM_DD_YYYY_DATE)).toEqual('06/01/21');
    });

    it('should correctly format UNIX_TIMESTAMP', () => {
        expect(formatDate(new Date('2021-06-01'), UNIX_TIMESTAMP)).toEqual('1622505600');
    });

    it('should correctly format UNIX_TIMESTAMP', () => {
        expect(formatDate(new Date('2021-06-01'), USA_MM_DD_YYYY_DATE_TIME)).toEqual('06/01/21 00:00:00');
    });
});
