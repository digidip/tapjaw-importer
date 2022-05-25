"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_http_connector_1 = (0, tslib_1.__importStar)(require("../tapjaw-http-connector"));
describe('Group of Http Connector tests', () => {
    class TestConnector extends tapjaw_http_connector_1.default {
        constructor() {
            super(...arguments);
            this.enableGzip = false;
            this.useDecoding = 'utf8';
            this.useEncoding = 'utf8';
        }
        testStringifyParameters(value) {
            return this.stringifyParameters(value);
        }
    }
    it('should correctly generate Query strings with different key => value types.', () => {
        const connector = new TestConnector('moo.com');
        expect(connector.testStringifyParameters({
            test: 'cat',
            moo: new tapjaw_http_connector_1.ArrayParameter('daisy', 'trilbee', '&moose'),
            meow: new tapjaw_http_connector_1.DuplicateParameter('pancho', 'sasha', '&kitten'),
        })).toEqual('test=cat&moo[]=daisy&moo[]=trilbee&moo[]=%26moose&meow=pancho&meow=sasha&meow=%26kitten');
    });
});
