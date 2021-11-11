export class TapjawAuthenticatorError extends Error {}

export type HttpHeaders = Record<string, string>;
export type AuthorizationHeaders = HttpHeaders & Record<'Authorization', string>;

/**
 * The base authentication contract.
 *
 * This is used by Connectors to authenticate a connection prior
 * to perform an API call.
 *
 * Two common approaches are available in the Tapjaw Importer toolkit:
 * 1. Specify shared credentials such as username, password, secret, or a token.
 * 2. Execute a request to a separate authentication endpoint and then use a responded token, access key or secret
 *    to gain access to the API.
 *
 * An additional unsupported method is also possible, using the session cookie in conjunction with a form login
 * request, although this requires defining scraping rules for HTML responses and potentially querying for request
 * tokens stored in a webpage to allow a login request.
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
