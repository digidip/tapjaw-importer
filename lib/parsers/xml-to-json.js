"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = require("xml2js");
const camelcaseKeys = require('camelcase-keys');
exports.default = async (xml) => {
    return new Promise((resolve, reject) => {
        xml2js_1.parseString(xml, {
            trim: true,
            explicitArray: false,
            attrkey: 'attributes'
        }, (err, result) => {
            if (err) {
                return reject(err);
            }
            result = camelcaseKeys(result, {
                deep: true
            });
            resolve(result);
        });
    });
};
