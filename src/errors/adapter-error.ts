import TapjawAdapter from '../contracts/tapjaw-adapter';
import TapjawMessage from '../contracts/tapjaw-message';
import isError from './typeguards/is-error';

export default class AdapterError extends Error {
    public parentStack?: string;

    constructor(message: unknown, adapter: TapjawAdapter<unknown, TapjawMessage>) {
        if (typeof message === 'string') {
            super(message);
            this.name = `AdapterError:${adapter.constructor.name}`;
        } else if (isError(message)) {
            super(String(message));
            this.name = `AdapterError:${adapter.constructor.name}`;
            this.parentStack = message.stack;
        } else {
            throw new Error('Unsupported message data type passed to AdapterError');
        }
    }
}
