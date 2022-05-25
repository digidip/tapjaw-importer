"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const date_segmenter_1 = require("../date-segmenter");
const end_of_date_1 = (0, tslib_1.__importDefault)(require("../end-of-date"));
const utc_date_1 = (0, tslib_1.__importDefault)(require("../utc-date"));
describe('Make sure dateSegmenter() yields the expected chunk dates.', () => {
    it('should return inbound segmented by 2 days with 1 day', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-01'),
        }))).toEqual([[(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-01'))]]);
    });
    it('should return inbound segmented by 2 days with 2 days', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-02'),
        }))).toEqual([[(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-02'))]]);
    });
    it('should return inbound segmented by 2 days with 3 days', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-03'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-02'))],
            [(0, utc_date_1.default)('2021-06-03'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-03'))],
        ]);
    });
    it('should return inbound segmented by 2 days with 4 days', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-04'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-02'))],
            [(0, utc_date_1.default)('2021-06-03'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-04'))],
        ]);
    });
    it('should return inbound segmented by 2 days with 5 days', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-05'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-02'))],
            [(0, utc_date_1.default)('2021-06-03'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-04'))],
            [(0, utc_date_1.default)('2021-06-05'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-05'))],
        ]);
    });
    it('should return inbound segmented by 3 days with 5 days', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(3, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-05'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-03'))],
            [(0, utc_date_1.default)('2021-06-04'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-05'))],
        ]);
    });
    it('should return inbound segmented by 10 days with 5 days', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(10, 'days', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-06-05'),
        }))).toEqual([[(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-06-05'))]]);
    });
    it('should return inbound segmented by 2 days with 10 days during DST change', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'days', {
            startDate: (0, utc_date_1.default)('2021-03-10'),
            endDate: (0, utc_date_1.default)('2021-03-20'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-03-10'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-11'))],
            [(0, utc_date_1.default)('2021-03-12'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-13'))],
            [(0, utc_date_1.default)('2021-03-14'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-15'))],
            [(0, utc_date_1.default)('2021-03-16'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-17'))],
            [(0, utc_date_1.default)('2021-03-18'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-19'))],
            [(0, utc_date_1.default)('2021-03-20'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-20'))],
        ]);
    });
    it('should return inbound segmented by 2 months with 1 month', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'months', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-07-01'),
        }))).toEqual([[(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-07-01'))]]);
    });
    it('should return inbound segmented by 2 months with 2 months', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'months', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-08-01'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-07-31'))],
            [(0, utc_date_1.default)('2021-08-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-08-01'))],
        ]);
    });
    it('should return inbound segmented by 2 months with 3 months', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'months', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-09-01'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-07-31'))],
            [(0, utc_date_1.default)('2021-08-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-09-01'))],
        ]);
    });
    it('should return inbound segmented by 2 months with 4 months', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'months', {
            startDate: (0, utc_date_1.default)('2021-06-01'),
            endDate: (0, utc_date_1.default)('2021-10-01'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-07-31'))],
            [(0, utc_date_1.default)('2021-08-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-09-30'))],
            [(0, utc_date_1.default)('2021-10-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-10-01'))],
        ]);
    });
    it('should return inbound segmented by 2 months with 4 months, account for DST change', () => {
        expect(Array.from((0, date_segmenter_1.inbound)(2, 'months', {
            startDate: (0, utc_date_1.default)('2021-02-01'),
            endDate: (0, utc_date_1.default)('2021-08-01'),
        }))).toEqual([
            [(0, utc_date_1.default)('2021-02-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-03-31'))],
            [(0, utc_date_1.default)('2021-04-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-05-31'))],
            [(0, utc_date_1.default)('2021-06-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-07-31'))],
            [(0, utc_date_1.default)('2021-08-01'), (0, end_of_date_1.default)((0, utc_date_1.default)('2021-08-01'))],
        ]);
    });
});
