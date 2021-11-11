import isError from '../typeguards/is-error';
import TapjawConnector from '../contracts/tapjaw-connector';

export default class TapjawConnectorError extends Error {
    public parentStack?: string;

    constructor(message: unknown, adapter: TapjawConnector) {
        if (typeof message === 'string') {
            super(message);
            this.name = `TapjawConnectorError:${adapter.constructor.name}`;
        } else if (isError(message)) {
            super(String(message));

            this.name = `TapjawConnectorError:${adapter.constructor.name}`;
            this.parentStack = message.stack;
        } else {
            throw new Error('Unsupported message data type passed to TapjawConnectorError');
        }
    }
}
