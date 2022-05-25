"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const csv_to_json_1 = (0, tslib_1.__importDefault)(require("../csv-to-json"));
describe('Make sure the csvToJson works as expected', () => {
    test('should return 3 basic records in an array', async () => {
        const csv = 'name,age,weight\nPancho,10,4.0\nSasha,11,3.7\nBiggles,3,0.1\n';
        expect(await (0, csv_to_json_1.default)(csv)).toEqual([
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
    test('should return 3 basic records in an array with custom delimiter', async () => {
        const csv = 'name;age;weight\nPancho;10;4.0\nSasha;11;3.7\nBiggles;3;0.1\n';
        expect(await (0, csv_to_json_1.default)(csv, undefined, ';')).toEqual([
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
        expect(await (0, csv_to_json_1.default)(csv)).toEqual([
            {
                namePlease: 'Pancho',
                age: '10',
                weightApprox: '4.0'
            }
        ]);
    });
    test('should recieve empty array when content is empty', async () => {
        expect(await (0, csv_to_json_1.default)('')).toEqual([]);
    });
    test('should recieve empty because first data row has a column missing', async () => {
        const csv = 'name-please,age,weight approx\nPancho,10\n';
        expect(await (0, csv_to_json_1.default)(csv)).toEqual([]);
    });
});
