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
    protected readonly enableHttps: boolean;
    protected readonly security?: TapjawAuthenticator | undefined;
    abstract enableGzip: boolean;
    abstract useDecoding?: string;
    abstract useEncoding?: string;
    protected authenticatorData: any;
    constructor(host: string, port?: number, enableHttps?: boolean, security?: TapjawAuthenticator | undefined);
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
     * Send a POST request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param json      TapjawHttpRequestBody
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    postJson(uri: string, query: TapjawHttpQueryParameters, json: TapjawHttpRequestBody, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse>;
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
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    private getResponse;
}
