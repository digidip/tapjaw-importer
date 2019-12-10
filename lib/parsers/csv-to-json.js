"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvToJsonConverter = require('csvtojson');
const camelcaseKeys = require('camelcase-keys');
exports.default = (csv, quote = '"') => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = (await csvToJsonConverter({
                quote,
                checkColumn: true
            }).fromString(csv));
            results = camelcaseKeys(results, {
                deep: true
            });
            return resolve(results);
        }
        catch (e) {
            reject(new Error(e));
        }
    });
};
