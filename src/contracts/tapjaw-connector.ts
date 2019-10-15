export class TapjawConnectorError extends Error {}

export type TapjawConnectorResponse = string | BinaryType;

/**
 * The base TapjawConnector contract.
 */
export default interface TapjawConnector {
    hasSecurity(): boolean;
}
