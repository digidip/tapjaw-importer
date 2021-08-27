export class TapjawAuthenticatorError extends Error {}

export type HttpHeaders = Record<string, string>;
export type AuthorizationHeaders = HttpHeaders & Record<'Authorization', string>;

/**
 * The base authentication contract.
 *
 * This is used by Connectors to authenticate a connection prior
 * to perform an API call.
 */
export default interface TapjawAuthenticator<T> {
    /**
     * Whether the authentication has occurred.
     *
     * @return boolean
     */
    isAuthenticated(): boolean;

    /**
     * Run authentication routine and pass the authentication data
     * into the connector.
     *
     * @param connector TapjawConnector
     *
     * @see TapjawConnector
     */
    authenticate(): Promise<T>;
}
