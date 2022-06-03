import isError from '../typeguards/is-error';
import TapjawConnector from '../contracts/tapjaw-connector';

export default class TapjawConnectorError extends Error {
    public parentStack?: string;

    constructor(message: unknown, connector: TapjawConnector) {
        if (typeof message === 'string') {
            super(`${connector.constructor.name}: ${message}`);
            this.name = `TapjawConnectorError:${connector.constructor.name}`;
        } else if (isError(message)) {
            super(`${connector.constructor.name}: ${String(message)}`);

            this.name = `TapjawConnectorError:${connector.constructor.name}`;
            this.parentStack = message.stack;
        } else {
            throw new Error('Unsupported message data type passed to TapjawConnectorError');
        }
    }
}
