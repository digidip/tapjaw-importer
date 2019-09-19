import { IncomingMessage, request } from 'http';
import * as https from 'https';
import { encode, decode, encodingExists } from 'iconv-lite';
import * as querystring from 'querystring';
import * as zlib from 'zlib';
import TapjawConnector, { TapjawConnectorResponse, TapjawConnectorError } from '../contracts/tapjaw-connector';
import TapjawAuthenticationWrapper from '../contracts/tapjaw-authentication-wrapper';

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

export type TapjawHttpRequestBody = string | TapjawHttpFormParameters;

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
    protected authenticatorData: any;

    public constructor(
        protected readonly host: string,
        protected readonly port = 80,
        protected readonly enableHttps = true,
        protected readonly security?: TapjawAuthenticationWrapper
    ) {}

    /**
     * Whether a authentication wrapper has been injected into the connector or not.
     */
    public hasSecurity(): boolean {
        return Boolean(this.security);
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
    public async get(uri: string, query: TapjawHttpQueryParameters, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'GET',
            headers
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
    public async post(uri: string, query: TapjawHttpQueryParameters, body: TapjawHttpRequestBody, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        if (typeof body === 'object') {
            body = querystring.stringify(body);
        }

        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body)
            }
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
    public async postJson(uri: string, query: TapjawHttpQueryParameters, json: TapjawHttpRequestBody, headers?: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        }

        const options: https.RequestOptions = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(json)
            }
        };

        return this.getResponse(options);
    }

    /**
     * Apply security authentication data to request options.
     *
     * @param options https.RequestOptions
     */
    private applySecurity(options: https.RequestOptions): Promise<https.RequestOptions> {
        return new Promise(async (resolve, reject) => {
            if (!this.security) {
                // No security implemented
                return resolve(options);
            }

            const updatedOptions = await this.security.authenticate(options).catch(reject);
            resolve(updatedOptions);
        });
    }

    /**
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    private getResponse(options: https.RequestOptions, writeBody?: string): Promise<TapjawConnectorResponse> {
        return new Promise(async (resolve, reject) => {
            options = await this.applySecurity(options);

            const requestImpl = this.enableHttps ? https.request : request;
            const connectorRequest = requestImpl(
                options,
                (response: IncomingMessage) => {
                    if (response.statusCode !== 200) {
                        const error = new TapjawConnectorError(`HTTP Status code was ${response.statusCode}.`);
                        reject(error);
                    }

                    let buffer: Buffer[] = [];
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
                }
            );

            if (writeBody) {
                connectorRequest.write(writeBody);
            }

            connectorRequest.end();
        });
    }
}
