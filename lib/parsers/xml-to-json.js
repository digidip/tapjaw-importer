"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const xml2js_1 = require("xml2js");
const camelcase_keys_1 = tslib_1.__importDefault(require("camelcase-keys"));
async function xmlToJson(xml) {
    const result = (await (0, xml2js_1.parseStringPromise)(xml, {
        trim: true,
        explicitArray: false,
        attrkey: 'attributes',
    }));
    return (0, camelcase_keys_1.default)(result, {
        deep: true,
    });
}
exports.default = xmlToJson;
