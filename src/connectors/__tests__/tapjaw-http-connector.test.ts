import TapjawHttpConnector, {
    TapjawHttpQueryParameters,
    ArrayParameter,
    DuplicateParameter,
} from '../tapjaw-http-connector';

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
});
