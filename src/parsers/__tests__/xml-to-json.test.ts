import xmlToJson from '../xml-to-json';

describe('Make sure the csvToJson works as expected', () => {
    test('should return 3 basic records in an array', async () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<animal-records>
    <animal-record>
        <name>Pancho</name>
        <age>10</age>
        <weight>4.0</weight>
    </animal-record>
    <animal-record>
        <name>Sasha</name>
        <age>11</age>
        <weight>3.7</weight>
    </animal-record>
    <animal-record>
        <name>Biggles</name>
        <age>3</age>
        <weight>0.1</weight>
    </animal-record>
</animal-records>`;
        interface AnimalRecord {
            name: string;
            age: string;
            weight: string;
        }

        expect(await xmlToJson<AnimalRecord[]>(xml)).toEqual({
            animalRecords: {
                animalRecord: [
                    {
                        name: 'Pancho',
                        age: '10',
                        weight: '4.0',
                    },
                    {
                        name: 'Sasha',
                        age: '11',
                        weight: '3.7',
                    },
                    {
                        name: 'Biggles',
                        age: '3',
                        weight: '0.1',
                    },
                ]
            }
        });
    });
});
