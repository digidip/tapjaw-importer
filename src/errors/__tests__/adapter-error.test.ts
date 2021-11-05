import TapjawAdapter from '../../contracts/tapjaw-adapter';
import TapjawMessage from '../../contracts/tapjaw-message';
import AdapterError from '../adapter-error';

class MockAdapter implements TapjawAdapter<unknown, TapjawMessage> {}

describe('Make sure AdapterError works as expected', () => {
    it('should return a AdapterError with a String as Error', () => {
        const error = new AdapterError('test error', new MockAdapter());
        expect(error).toMatchSnapshot();
        expect(error.message).toEqual('test error');
        expect(error.name).toEqual('AdapterError:MockAdapter');
        expect(error.parentStack).toBeUndefined();
    });

    it('should return a AdapterError with an Error instance as Error', () => {
        const initialError = new Error('test error');
        const error = new AdapterError(initialError, new MockAdapter());
        expect(error).toMatchSnapshot();
        expect(error.message).toEqual('Error: test error');
        expect(error.name).toEqual('AdapterError:MockAdapter');
        expect(error.parentStack).toEqual(initialError.stack);
    });

    it('should return a error due to invalid type', () => {
        expect(() => new AdapterError(null, new MockAdapter())).toThrowError(
            new Error('Unsupported message data type passed to AdapterError')
        );
    });
});
