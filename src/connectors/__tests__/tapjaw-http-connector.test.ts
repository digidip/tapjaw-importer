import TapjawHttpConnector, {
    TapjawHttpQueryParameters,
    ArrayParameter,
    DuplicateParameter,
} from '../tapjaw-http-connector';

let statusCode = 200;
jest.mock('https', () => {
    return {
        request: jest.fn((options, callback) => {
        const res = {
            statusCode,
            headers: {},
            on: jest.fn((event, listener) => {
            if (event === 'data') {
                listener(Buffer.from('Mocked response data'));
            }
            if (event === 'end') {
                listener();
            }
            }),
        };

        if (callback) {
            callback(res);
        }

        return {
            write: jest.fn(),
            end: jest.fn(),
            on: jest.fn(),
        };
        }),
    };
});

describe('Group of Http Connector tests', () => {
    class TestConnector extends TapjawHttpConnector {
        enableGzip = false;
        useDecoding = 'utf8';
        useEncoding = 'utf8';

        public testStringifyParameters(value: TapjawHttpQueryParameters): string {
            return this.stringifyParameters(value);
        }
    }

    it('should correctly generate Query strings with different key => value types.', () => {
        const connector = new TestConnector('moo.com');
        expect(
            connector.testStringifyParameters({
                test: 'cat',
                moo: new ArrayParameter('daisy', 'trilbee', '&moose'),
                meow: new DuplicateParameter('pancho', 'sasha', '&kitten'),
            })
        ).toEqual('test=cat&moo[]=daisy&moo[]=trilbee&moo[]=%26moose&meow=pancho&meow=sasha&meow=%26kitten');
    });

    it.each([{ givenStatusCode: 500 }, { givenStatusCode: 400 }, { givenStatusCode: 401 }])
        ('should throw error for response with statuses codes like "$givenStatusCode"', ({givenStatusCode}) => {
        statusCode = givenStatusCode;
        const connector = new TestConnector('moo.com');
        
        expect(async () =>
            await connector.post('/test-uri',{},{})
        ).rejects.toThrow(new Error(`TestConnector: HTTP Status code was ${givenStatusCode}.`));
    });

    it.each([{ givenStatusCode: 200 }, { givenStatusCode: 201 }, { givenStatusCode: 204 }])
        ('should NOT throw error for response with success status code "$givenStatusCode"', async ({givenStatusCode}) => {
        statusCode = givenStatusCode;
        const connector = new TestConnector('moo.com');

        await expect(
            connector.post('/test-uri',{},{})
        ).resolves.toEqual('Mocked response data');
    });
});
