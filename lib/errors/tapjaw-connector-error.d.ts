import TapjawConnector from '../contracts/tapjaw-connector';
export default class TapjawConnectorError extends Error {
    parentStack?: string;
    constructor(message: unknown, connector: TapjawConnector);
}
