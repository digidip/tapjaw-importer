import dateSegmenter from '../date-segmenter';
import endOfDate from '../end-of-date';
import utcDate from '../utc-date';

describe('Make sure dateSegmenter() yields the expected chunk dates.', () => {
    it('should return inbound segmented by 2 days with 1 day', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-01'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-01')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 days with 2 days', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-02'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-02')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 days with 3 days', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-03'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-02')),
            ],
            [
                utcDate('2021-06-03'),
                endOfDate(utcDate('2021-06-03')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 days with 4 days', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-04'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-02')),
            ],
            [
                utcDate('2021-06-03'),
                endOfDate(utcDate('2021-06-04')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 days with 5 days', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-05'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-02')),
            ],
            [
                utcDate('2021-06-03'),
                endOfDate(utcDate('2021-06-04')),
            ],
            [
                utcDate('2021-06-05'),
                endOfDate(utcDate('2021-06-05')),
            ],
        ]);
    });

    it('should return inbound segmented by 3 days with 5 days', () => {
        expect(Array.from(dateSegmenter.inbound(
            3,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-05'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-03')),
            ],
            [
                utcDate('2021-06-04'),
                endOfDate(utcDate('2021-06-05')),
            ],
        ]);
    });

    it('should return inbound segmented by 10 days with 5 days', () => {
        expect(Array.from(dateSegmenter.inbound(
            10,
            'days',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-06-05'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-06-05')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 days with 10 days during DST change', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'days',
            {
                startDate: utcDate('2021-03-10'),
                endDate: utcDate('2021-03-20'),
            }
        ))).toEqual([
            [
                utcDate('2021-03-10'),
                endOfDate(utcDate('2021-03-11')),
            ],
            [
                utcDate('2021-03-12'),
                endOfDate(utcDate('2021-03-13')),
            ],
            [
                utcDate('2021-03-14'),
                endOfDate(utcDate('2021-03-15')),
            ],
            [
                utcDate('2021-03-16'),
                endOfDate(utcDate('2021-03-17')),
            ],
            [
                utcDate('2021-03-18'),
                endOfDate(utcDate('2021-03-19')),
            ],
            [
                utcDate('2021-03-20'),
                endOfDate(utcDate('2021-03-20')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 months with 1 month', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'months',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-07-01'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-07-01')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 months with 2 months', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'months',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-08-01'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-07-31')),
            ],
            [
                utcDate('2021-08-01'),
                endOfDate(utcDate('2021-08-01')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 months with 3 months', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'months',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-09-01'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-07-31')),
            ],
            [
                utcDate('2021-08-01'),
                endOfDate(utcDate('2021-09-01')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 months with 4 months', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'months',
            {
                startDate: utcDate('2021-06-01'),
                endDate: utcDate('2021-10-01'),
            }
        ))).toEqual([
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-07-31')),
            ],
            [
                utcDate('2021-08-01'),
                endOfDate(utcDate('2021-09-30')),
            ],
            [
                utcDate('2021-10-01'),
                endOfDate(utcDate('2021-10-01')),
            ],
        ]);
    });

    it('should return inbound segmented by 2 months with 4 months, account for DST change', () => {
        expect(Array.from(dateSegmenter.inbound(
            2,
            'months',
            {
                startDate: utcDate('2021-02-01'),
                endDate: utcDate('2021-08-01'),
            }
        ))).toEqual([
            [
                utcDate('2021-02-01'),
                endOfDate(utcDate('2021-03-31')),
            ],
            [
                utcDate('2021-04-01'),
                endOfDate(utcDate('2021-05-31')),
            ],
            [
                utcDate('2021-06-01'),
                endOfDate(utcDate('2021-07-31')),
            ],
            [
                utcDate('2021-08-01'),
                endOfDate(utcDate('2021-08-01')),
            ],
        ]);
    });
});
