import TapjawAdapter from '../contracts/tapjaw-adapter';
import TapjawMessage from '../messages/tapjaw-message';
import isError from './typeguards/is-error';

export default class TapjawAdapterError extends Error {
    public parentStack?: string;

    constructor(message: unknown, adapter: TapjawAdapter<unknown, TapjawMessage>) {
        if (typeof message === 'string') {
            super(message);
            this.name = `TapjawAdapterError:${adapter.constructor.name}`;
        } else if (isError(message)) {
            super(String(message));
            this.name = `TapjawAdapterError:${adapter.constructor.name}`;
            this.parentStack = message.stack;
        } else {
            throw new Error('Unsupported message data type passed to TapjawAdapterError');
        }
    }
}
