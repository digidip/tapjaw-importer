import csvToJson from '../csv-to-json';

describe('Make sure the csvToJson works as expected', () => {
    test('should return 3 basic records in an array', async () => {
        const csv =
            'name,age,weight\nPancho,10,4.0\nSasha,11,3.7\nBiggles,3,0.1\n';
        interface AnimalRecord {
            name: string;
            age: string;
            weight: string;
        }

        expect(await csvToJson<AnimalRecord[]>(csv)).toEqual([
            {
                name: 'Pancho',
                age: '10',
                weight: '4.0'
            },
            {
                name: 'Sasha',
                age: '11',
                weight: '3.7'
            },
            {
                name: 'Biggles',
                age: '3',
                weight: '0.1'
            }
        ]);
    });

    test('should camelcase the keys', async () => {
        const csv = 'name-please,age,weight approx\nPancho,10,4.0\n';
        interface AnimalRecord {
            namePlease: string;
            age: string;
            weightApprox: string;
        }

        expect(await csvToJson<AnimalRecord[]>(csv)).toEqual([
            {
                namePlease: 'Pancho',
                age: '10',
                weightApprox: '4.0'
            }
        ]);
    });

    test('should recieve empty array when content is empty', async () => {
        interface AnimalRecord {
            namePlease: string;
            age: string;
            weightApprox: string;
        }

        expect(await csvToJson<AnimalRecord[]>('')).toEqual([]);
    });

    test('should recieve empty because first data row has a column missing', async () => {
        const csv = 'name-please,age,weight approx\nPancho,10\n';
        interface AnimalRecord {
            namePlease: string;
            age: string;
            weightApprox: string;
        }

        expect(await csvToJson<AnimalRecord[]>(csv)).toEqual([]);
    });
});
