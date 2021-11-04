import TapjawConnector from '../contracts/tapjaw-connector';
export default class ConnectorError extends Error {
    parentStack?: string;
    constructor(message: unknown, adapter: TapjawConnector);
}
