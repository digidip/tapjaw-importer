import sortObjectArrays from '../sort-object-arrays';

describe('Make sure sortObjectArrays() works as expected', () => {
    test('should sort a basic array of strings payload', () => {
        const payload = {
            moo: ['zzz', 'aaa', 'ddd', 'ccc', 'jjj']
        };

        expect(sortObjectArrays(payload)).toEqual({
            moo: ['aaa', 'ccc', 'ddd', 'jjj', 'zzz']
        });
    });

    test('should sort a basic array of number payload', () => {
        const payload = {
            moo: [999, 111, 444, 333, 777]
        };

        expect(sortObjectArrays(payload)).toEqual({
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

        expect(sortObjectArrays(payload)).toEqual({
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
