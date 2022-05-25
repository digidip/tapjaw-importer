"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_adapter_error_1 = (0, tslib_1.__importDefault)(require("../tapjaw-adapter-error"));
class MockAdapter {
}
describe('Make sure TapjawAdapterError works as expected', () => {
    it('should return a TapjawAdapterError with a String as Error', () => {
        const error = new tapjaw_adapter_error_1.default('test error', new MockAdapter());
        expect(error).toMatchSnapshot();
        expect(error.message).toEqual('test error');
        expect(error.name).toEqual('TapjawAdapterError:MockAdapter');
        expect(error.parentStack).toBeUndefined();
    });
    it('should return a TapjawAdapterError with an Error instance as Error', () => {
        const initialError = new Error('test error');
        const error = new tapjaw_adapter_error_1.default(initialError, new MockAdapter());
        expect(error).toMatchSnapshot();
        expect(error.message).toEqual('Error: test error');
        expect(error.name).toEqual('TapjawAdapterError:MockAdapter');
        expect(error.parentStack).toEqual(initialError.stack);
    });
    it('should return a error due to invalid type', () => {
        expect(() => new tapjaw_adapter_error_1.default(null, new MockAdapter())).toThrowError(new Error('Unsupported message data type passed to TapjawAdapterError'));
    });
});
