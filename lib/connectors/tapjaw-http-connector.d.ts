/// <reference types="node" />
import { IncomingMessage } from "http";
import TapjawConnector, { TapjawConnectorResponse } from "../contracts/tapjaw-connector";
import TapjawAuthenticationWrapper from "../contracts/tapjaw-authentication-wrapper";
export interface TapjawHttpHeaders extends Record<string, string | undefined> {
    Accept?: string;
    "Accept-Encoding"?: string;
    Cookie?: string;
    "User-Agent"?: string;
}
export declare class ArrayParameter {
    values: string[];
    constructor(...values: string[]);
}
export declare class DuplicateParameter {
    values: string[];
    constructor(...values: string[]);
}
export declare type TapjawHttpQueryParameters = Record<string, string | ArrayParameter | DuplicateParameter>;
export declare type TapjawHttpFormParameters = Record<string, string>;
export declare type TapjawHttpRequestBody = string | TapjawHttpFormParameters;
/**
 * Known supported character sets used by {@link TapjawHttpConnector}, {@link TapjawMetadata.Connector.Encode}
 * and {@link TapjawMetadata.Connector.Encode}.
 * @enum
 */
export declare enum TapjawHttpConnectorCharSet {
    UTF8 = "utf-8",
    LATIN1 = "iso-8859-1"
}
/**
 * Supported protocols for HTTP based connectors.
 * @enum
 */
export declare enum TapjawHttpConnectorProtocol {
    HTTPS = "https",
    HTTP = "http"
}
/**
 * @module TapjawConnector
 *
 * The default HTTP and HTTPS API connector.
 */
export default abstract class TapjawHttpConnector implements TapjawConnector {
    protected host: string;
    protected port: number;
    protected protocol: TapjawHttpConnectorProtocol;
    protected security?: TapjawAuthenticationWrapper | undefined;
    /**
     * Enable/Disable gzip decompressing of API response.
     */
    abstract enableGzip: boolean;
    /**
     * Apply a character set encoding to decode the API response buffer.
     *
     * This happens prior to encoding, so you can perform a decoding
     * and encoding in conjunction with TapjawHttpConnector.useEncoding.
     */
    abstract useDecoding?: TapjawHttpConnectorCharSet | string;
    /**
     * Apply a character set encoding to encode the response prior to returning.
     *
     * This happens after decoding the respone buffer, so you
     * can decode the buffer prior to encoding the buffer. you can
     * also simply encode the buffer without any prior decoding.
     */
    abstract useEncoding?: TapjawHttpConnectorCharSet | string;
    /**
     * Abetiary container for authentication data which can be used in
     * conjunction with a request to an API endpoint.
     */
    protected authenticatorData: unknown;
    /**
     * Containers the response object of the previous request.
     */
    protected lastResponse: IncomingMessage | null;
    constructor(host: string, port?: number, protocol?: TapjawHttpConnectorProtocol, security?: TapjawAuthenticationWrapper | undefined);
    /**
     * Whether a authentication wrapper has been injected into the connector or not.
     */
    hasSecurity(): boolean;
    getLastResponse(): IncomingMessage | null;
    /**
     * Set the character set encoding to decode the API response data before encoding or returning.
     *
     * @param encoding  TapjawHttpConnectorProtocol|string|null
     */
    setDecoding(encoding: TapjawHttpConnectorCharSet | string | null): void;
    /**
     * Set the character set encoding on the response data.
     *
     * @param encoding {@link TapjawHttpConnectorProtocol}|string|null
     */
    setEncoding(encoding: TapjawHttpConnectorCharSet | string | null): void;
    /**
     * Send a GET request to the API.
     *
     * @param uri       string
     * @param query     {@link TapjawHttpQueryParameters}
     * @param headers   {@link TapjawHttpHeaders} (optional)
     *
     * @returns {@link TapjawConnectorResponse}
     */
    get(uri: string, query: TapjawHttpQueryParameters, headers?: TapjawHttpHeaders, timeout?: number): Promise<TapjawConnectorResponse>;
    /**
     * Send a DELETE request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @returns {@link TapjawConnectorResponse}
     */
    delete(uri: string, query: TapjawHttpQueryParameters, headers?: TapjawHttpHeaders, timeout?: number): Promise<TapjawConnectorResponse>;
    /**
     * Send a POST request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param body      TapjawHttpRequestBody
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @returns {@link TapjawConnectorResponse}
     */
    post(uri: string, query: TapjawHttpQueryParameters, body: TapjawHttpRequestBody, headers?: TapjawHttpHeaders, timeout?: number): Promise<TapjawConnectorResponse>;
    /**
     * Send a POST request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param json      TapjawHttpRequestBody
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @returns {@link TapjawConnectorResponse}
     */
    postJson(uri: string, query: TapjawHttpQueryParameters, json: TapjawHttpRequestBody, headers?: TapjawHttpHeaders, timeout?: number): Promise<TapjawConnectorResponse>;
    /**
     * Convert a query object into a query string, respecting arrayed and duplicated
     * keys.
     *
     * @param query TapjawHttpQueryParameters
     */
    protected stringifyParameters(query: TapjawHttpQueryParameters): string;
    /**
     * Apply security authentication data to request options.
     *
     * @param options https.RequestOptions
     */
    private applySecurity;
    private getProtocolRequest;
    /**
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    private getResponse;
}
