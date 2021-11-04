import TapjawConnector from '../contracts/tapjaw-connector';
import isError from './typeguards/is-error';

export default class ConnectorError extends Error {
    public parentStack?: string;

    constructor(message: unknown, adapter: TapjawConnector) {
        if (typeof message === 'string') {
            super(message);
            this.name = `ConnectorError:${adapter.constructor.name}`;
        } else if (isError(message)) {
            super(String(message));

            this.name = `ConnectorError:${adapter.constructor.name}`;
            this.parentStack = message.stack;
        } else {
            throw new Error('Unsupported message data type passed to ConnectorError');
        }
    }
}
