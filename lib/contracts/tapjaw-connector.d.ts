export declare class TapjawConnectorError extends Error {
}
export declare type TapjawConnectorResponse = string | BinaryType | Record<string, unknown>;
/**
 * The base TapjawConnector contract.
 */
export default interface TapjawConnector {
    hasSecurity(): boolean;
}
