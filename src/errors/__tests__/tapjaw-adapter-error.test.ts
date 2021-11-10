import TapjawAdapter from '../../contracts/tapjaw-adapter';
import TapjawMessage from '../../messages/tapjaw-message';
import TapjawAdapterError from '../tapjaw-adapter-error';

class MockAdapter implements TapjawAdapter<unknown, TapjawMessage> {}

describe('Make sure TapjawAdapterError works as expected', () => {
    it('should return a TapjawAdapterError with a String as Error', () => {
        const error = new TapjawAdapterError('test error', new MockAdapter());
        expect(error).toMatchSnapshot();
        expect(error.message).toEqual('test error');
        expect(error.name).toEqual('TapjawAdapterError:MockAdapter');
        expect(error.parentStack).toBeUndefined();
    });

    it('should return a TapjawAdapterError with an Error instance as Error', () => {
        const initialError = new Error('test error');
        const error = new TapjawAdapterError(initialError, new MockAdapter());
        expect(error).toMatchSnapshot();
        expect(error.message).toEqual('Error: test error');
        expect(error.name).toEqual('TapjawAdapterError:MockAdapter');
        expect(error.parentStack).toEqual(initialError.stack);
    });

    it('should return a error due to invalid type', () => {
        expect(() => new TapjawAdapterError(null, new MockAdapter())).toThrowError(
            new Error('Unsupported message data type passed to TapjawAdapterError')
        );
    });
});
