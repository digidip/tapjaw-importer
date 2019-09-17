import TapjawConnector, { TapjawConnectorResponse } from '../contracts/tapjaw-connector';
import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
export interface TapjawHttpHeaders {
    [key: string]: string | undefined;
    Accept?: string;
    'Accept-Encoding'?: string;
    Cookie?: string;
    'User-Agent'?: string;
}
export interface TapjawHttpQueryParameters {
    [key: string]: string;
}
export interface TapjawHttpFormParameters {
    [key: string]: string;
}
export declare type TapjawHttpRequestBody = string | TapjawHttpFormParameters;
export default abstract class TapjawHttpConnector implements TapjawConnector {
    protected readonly host: string;
    protected readonly port: number;
    protected readonly security?: TapjawAuthenticator | undefined;
    abstract enableGzip: boolean;
    abstract useDecoding?: string;
    abstract useEncoding?: string;
    protected authenticatorData: any;
    constructor(host: string, port?: number, security?: TapjawAuthenticator | undefined);
    /**
     * Set the character set encoding to decode the API response data before encoding or returning.
     *
     * @param encoding  string|null
     */
    setDecoding(encoding: string | null): void;
    /**
     * Set the character set encoding on the response data.
     *
     * @param encoding string|null
     */
    setEncoding(encoding: string | null): void;
    /**
     * Set the authenticator response to connector.
     *
     * @param authenticatorData any
     *
     * @return void
     */
    setAuthenticatorData(authenticatorData: any): void;
    /**
     * Send a GET request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    get(uri: string, query: TapjawHttpQueryParameters, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse>;
    /**
     * Send a POST request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param body      TapjawHttpRequestBody
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    post(uri: string, query: TapjawHttpQueryParameters, body: TapjawHttpRequestBody, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse>;
    /**
     * Has a security authenticator been configured?
     *
     * @return boolean
     */
    protected securityEnabled(): boolean;
    /**
     * Has the security authenticator successfully authenticated.
     *
     * @return boolean
     */
    protected isAuthenticated(): boolean;
    /**
     * HTTP Response handler.
     *
     * @param resolve   (args?: any) => void
     * @param reject    (args?: any) => void
     * @param response  IncomingMessage
     */
    private responseHandler;
}
