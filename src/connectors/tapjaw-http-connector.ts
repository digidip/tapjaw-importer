import http, { IncomingMessage } from 'http';
import https from 'https';
import { encode, decode, encodingExists } from 'iconv-lite';
import querystring from 'querystring';
import zlib from 'zlib';
import TapjawConnector, { TapjawConnectorResponse, TapjawConnectorError } from '../contracts/tapjaw-connector';
import TapjawAuthenticationWrapper from '../contracts/tapjaw-authentication-wrapper';
import deepmerge from 'deepmerge';

export interface TapjawHttpHeaders extends Record<string, string | undefined> {
    Accept?: string;
    'Accept-Encoding'?: string;
    Cookie?: string;
    'User-Agent'?: string;
}

export class ArrayParameter {
    public values: string[];
    constructor(...values: string[]) {
        this.values = values;
    }
}

export class DuplicateParameter {
    public values: string[];
    constructor(...values: string[]) {
        this.values = values;
    }
}

export type TapjawHttpQueryParameters = Record<string, string | ArrayParameter | DuplicateParameter>;

export type TapjawHttpFormParameters = Record<string, string>;

export type TapjawHttpRequestBody = string | TapjawHttpFormParameters;

const DEFAULT_TIMEOUT = 30000;

/**
 * The default HTTP and HTTPS API request wrapper.
 */
export default abstract class TapjawHttpConnector implements TapjawConnector {
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
    abstract useDecoding?: string;

    /**
     * Apply a character set encoding to encode the response prior to returning.
     *
     * This happens after decoding the respone buffer, so you
     * can decode the buffer prior to encoding the buffer. you can
     * also simply encode the buffer without any prior decoding.
     */
    abstract useEncoding?: string;

    /**
     * Abetiary container for authentication data which can be used in
     * conjunction with a request to an API endpoint.
     */
    protected authenticatorData: unknown;

    /**
     * Containers the response object of the previous request.
     */
    protected lastResponse: IncomingMessage | null = null;

    public constructor(
        protected readonly host: string,
        protected readonly port = 80,
        protected readonly enableHttps = true,
        protected readonly security?: TapjawAuthenticationWrapper
    ) {
        if (enableHttps && (port === 80 || !port)) {
            this.port = 443;
        }
    }

    /**
     * Whether a authentication wrapper has been injected into the connector or not.
     */
    public hasSecurity(): boolean {
        return Boolean(this.security);
    }

    public getLastResponse(): IncomingMessage | null {
        return this.lastResponse;
    }

    /**
     * Set the character set encoding to decode the API response data before encoding or returning.
     *
     * @param encoding  string|null
     */
    public setDecoding(encoding: string | null): void {
        if (!encoding) {
            delete this.useDecoding;
        }

        if (encodingExists(encoding as string)) {
            throw new TapjawConnectorError(`Unsupported decoding: ${encoding}`);
        }

        this.useDecoding = encoding as string;
    }

    /**
     * Set the character set encoding on the response data.
     *
     * @param encoding string|null
     */
    public setEncoding(encoding: string | null): void {
        if (!encoding) {
            delete this.useEncoding;
        }

        if (!encodingExists(encoding as string)) {
            throw new TapjawConnectorError(`Unsupported encoding: ${encoding}`);
        }

        this.useEncoding = encoding as string;
    }

    /**
     * Send a GET request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    public async get(
        uri: string,
        query: TapjawHttpQueryParameters,
        headers?: TapjawHttpHeaders,
        timeout = DEFAULT_TIMEOUT
    ): Promise<TapjawConnectorResponse> {
        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: 'GET',
            headers,
            timeout,
        };

        return this.getResponse(options);
    }

    /**
     * Send a DELETE request to the API.
     *
     * @param uri       string
     * @param query     TapjawHttpQueryParameters
     * @param headers   TapjawHttpHeaders (optional)
     *
     * @return TapjawConnectorResponse
     */
    public async delete(
        uri: string,
        query: TapjawHttpQueryParameters,
        headers?: TapjawHttpHeaders,
        timeout = DEFAULT_TIMEOUT
    ): Promise<TapjawConnectorResponse> {
        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: 'DELETE',
            headers,
            timeout,
        };

        return this.getResponse(options);
    }

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
    public async post(
        uri: string,
        query: TapjawHttpQueryParameters,
        body: TapjawHttpRequestBody,
        headers?: TapjawHttpHeaders,
        timeout = DEFAULT_TIMEOUT
    ): Promise<TapjawConnectorResponse> {
        if (typeof body === 'object') {
            body = querystring.stringify(body);
        }

        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body),
            },
            timeout,
        };

        return this.getResponse(options, body);
    }

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
    public async postJson(
        uri: string,
        query: TapjawHttpQueryParameters,
        json: TapjawHttpRequestBody,
        headers?: TapjawHttpHeaders,
        timeout = DEFAULT_TIMEOUT
    ): Promise<TapjawConnectorResponse> {
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        }

        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(json),
            },
            timeout,
        };

        return this.getResponse(options, json);
    }

    /**
     * Convert a query object into a query string, respecting arrayed and duplicated
     * keys.
     *
     * @param query TapjawHttpQueryParameters
     */
    protected stringifyParameters(query: TapjawHttpQueryParameters): string {
        const queryParams = [];
        for (const [key, value] of Object.entries(query)) {
            if (value instanceof ArrayParameter) {
                for (const item of value.values) {
                    queryParams.push(`${key}[]=${querystring.escape(item)}`);
                }
            } else if (value instanceof DuplicateParameter) {
                for (const item of value.values) {
                    queryParams.push(`${key}=${querystring.escape(item)}`);
                }
            } else {
                queryParams.push(`${key}=${querystring.escape(value)}`);
            }
        }

        return queryParams.join('&');
    }

    /**
     * Apply security authentication data to request options.
     *
     * @param options https.RequestOptions
     */
    private async applySecurity(options: https.RequestOptions): Promise<https.RequestOptions> {
        if (!this.security) {
            // No security implemented
            return options;
        }

        const updatedOptions = await this.security.authenticate(options) as Record<string, unknown>;
        return deepmerge(options, updatedOptions);
    }

    /**
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    private async getResponse(options: https.RequestOptions, writeBody?: string): Promise<TapjawConnectorResponse> {
        options = await this.applySecurity(options);

        return new Promise((resolve, reject) => {
            const requestImpl = this.enableHttps ? https.request : http.request;
            const connectorRequest = requestImpl(options, (response: IncomingMessage) => {
                this.lastResponse = response;
                if (response.statusCode !== 200) {
                    const error = new TapjawConnectorError(`HTTP Status code was ${response.statusCode}.`);
                    reject(error);
                }

                const buffer: Buffer[] = [];
                response.on('data', (data: string) => buffer.push(Buffer.from(data, 'binary')));
                response.on('end', async () => {
                    let contentBuffer = Buffer.concat(buffer);

                    if (!contentBuffer) {
                        reject(new TapjawConnectorError('Empty content buffer'));
                    }

                    if (this.enableGzip) {
                        contentBuffer = zlib.gunzipSync(contentBuffer);
                    }

                    if (this.useDecoding) {
                        contentBuffer = Buffer.from(decode(contentBuffer, this.useDecoding));
                    }

                    // return raw string buffer.
                    resolve(
                        this.useEncoding
                            ? encode(contentBuffer.toString(), this.useEncoding).toString()
                            : contentBuffer.toString()
                    );
                });
                response.on('error', reject);
            });


            connectorRequest
                .on('timeout', () => {
                    connectorRequest.abort();
                    reject(new TapjawConnectorError(`${options.hostname} Timed out after ${options.timeout}ms`));
                })
                .on('error', reject);

            if (writeBody) {
                connectorRequest.write(writeBody);
            }

            connectorRequest.end();
        });
    }
}
