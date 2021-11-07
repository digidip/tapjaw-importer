import TapjawConnector from '../contracts/tapjaw-connector';
export declare class TapjawConnectorError extends Error {
    parentStack?: string;
    constructor(message: unknown, adapter: TapjawConnector);
}
