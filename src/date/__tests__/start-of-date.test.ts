import startOfDate from '../start-of-date';

describe('Make sure startOfDate() works as expected', () => {
    it('should correctly set the time to 00:00:00 in UTC.', () => {
        expect(startOfDate(new Date('2021-06-01 02:00:00+02:00'))).toEqual(new Date('2021-06-01 00:00:00+00:00'));
    });
});
