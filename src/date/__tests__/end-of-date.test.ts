import endOfDate from "../end-of-date";

describe('Make sure endOfDate() works as expected', () => {
    it('should correctly set the time to 00:00:00 in UTC.', () => {
        expect(endOfDate(new Date('2021-06-01 02:00:00+02:00'))).toEqual(new Date('2021-06-01 23:59:59.999+00:00'));
        expect(endOfDate(new Date('2021-06-01 23:00:00+02:00'))).toEqual(new Date('2021-06-01 23:59:59.999+00:00'));
    });
});
