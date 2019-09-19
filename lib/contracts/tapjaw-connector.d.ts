export declare class TapjawConnectorError extends Error {
}
export interface TapjawConnectorResponse {
}
/**
 * The base TapjawConnector contract.
 */
export default interface TapjawConnector {
    hasSecurity(): boolean;
}
