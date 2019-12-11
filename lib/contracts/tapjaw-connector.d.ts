export declare class TapjawConnectorError extends Error {
}
export declare type TapjawConnectorResponse = string | BinaryType | object;
/**
 * The base TapjawConnector contract.
 */
export default interface TapjawConnector {
    hasSecurity(): boolean;
}
