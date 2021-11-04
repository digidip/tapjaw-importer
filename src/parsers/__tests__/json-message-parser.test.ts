process.env['TAPJAW_MESSAGE_SECRET'] = 'test';

import TapjawMessage from '../../contracts/tapjaw-message';
import jsonMessageParser from '../json-message-parser';
import NullLogger from '../../support/null-logger';

describe('Make sure the jsonMessageParser works as expected', () => {
    test('should return a TapjawMessage', () => {
        const sampleMsg = new TapjawMessage('test', { test: 'test' });
        const sampleJson = JSON.stringify(sampleMsg);
        expect(jsonMessageParser(sampleJson, true, new NullLogger())).toEqual(JSON.parse(sampleJson));
    });

    test('should return NULL and not throw syntax error', () => {
        expect(jsonMessageParser('{', false, new NullLogger())).toEqual(null);
    });

    test('should return NULL and also log syntax error', () => {
        const logger = new NullLogger();
        const spy = jest.spyOn(logger, 'error');

        expect(jsonMessageParser('{', true, logger)).toEqual(null);
        expect(spy).toBeCalled();
    });
});
