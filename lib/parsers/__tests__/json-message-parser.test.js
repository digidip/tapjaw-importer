"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['TAPJAW_MESSAGE_SHA256_SECRET'] = 'test';
const tapjaw_message_1 = (0, tslib_1.__importDefault)(require("../../messages/tapjaw-message"));
const json_message_parser_1 = (0, tslib_1.__importDefault)(require("../json-message-parser"));
const null_logger_1 = (0, tslib_1.__importDefault)(require("../../support/null-logger"));
describe('Make sure the jsonMessageParser works as expected', () => {
    test('should return a TapjawMessage', () => {
        const sampleMsg = new tapjaw_message_1.default('test', { test: 'test' });
        const sampleJson = JSON.stringify(sampleMsg);
        expect((0, json_message_parser_1.default)(sampleJson, true, new null_logger_1.default())).toEqual(JSON.parse(sampleJson));
    });
    test('should return NULL and not throw syntax error', () => {
        expect((0, json_message_parser_1.default)('{', false, new null_logger_1.default())).toEqual(null);
    });
    test('should return NULL and also log syntax error', () => {
        const logger = new null_logger_1.default();
        const spy = jest.spyOn(logger, 'error');
        expect((0, json_message_parser_1.default)('{', true, logger)).toEqual(null);
        expect(spy).toBeCalled();
    });
});
