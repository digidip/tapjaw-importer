/**
 * The default response type for {@link TapjawConnector} methods.
 */
export type TapjawConnectorResponse = string | BinaryType | Record<string, unknown>;

/**
 * @module TapjawConnector
 *
 * The base TapjawConnector which all other Connectors should be derived from.
 */
export default interface TapjawConnector {
    /**
     * Flag whether a secure request must get executed for the connector.
     */
    hasSecurity(): boolean;
}
