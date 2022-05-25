"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sort_object_arrays_1 = (0, tslib_1.__importDefault)(require("../sort-object-arrays"));
describe('Make sure sortObjectArrays() works as expected', () => {
    test('should sort a basic array of strings payload', () => {
        const payload = {
            moo: ['zzz', 'aaa', 'ddd', 'ccc', 'jjj']
        };
        expect((0, sort_object_arrays_1.default)(payload)).toEqual({
            moo: ['aaa', 'ccc', 'ddd', 'jjj', 'zzz']
        });
    });
    test('should sort a basic array of number payload', () => {
        const payload = {
            moo: [999, 111, 444, 333, 777]
        };
        expect((0, sort_object_arrays_1.default)(payload)).toEqual({
            moo: [111, 333, 444, 777, 999]
        });
    });
    test('should sort an array of objects payload (support nesting)', () => {
        const payload = {
            moo: [
                { number: 999 },
                { string: 'zoo' },
                { number: 111 },
                { number: 444 },
                { string: 'moo' },
                {
                    nested: [
                        {
                            name: 'zoo'
                        },
                        {
                            name: 'moo',
                            nested: [
                                {
                                    name: 'zoo'
                                },
                                {
                                    name: 'moo'
                                }
                            ]
                        }
                    ]
                },
                { number: 333 },
                { number: 777 }
            ]
        };
        expect((0, sort_object_arrays_1.default)(payload)).toEqual({
            moo: [
                {
                    nested: [
                        {
                            name: 'moo',
                            nested: [
                                {
                                    name: 'moo'
                                },
                                {
                                    name: 'zoo'
                                }
                            ]
                        },
                        {
                            name: 'zoo'
                        }
                    ]
                },
                { number: 111 },
                { number: 333 },
                { number: 444 },
                { number: 777 },
                { number: 999 },
                { string: 'moo' },
                { string: 'zoo' }
            ]
        });
    });
});
