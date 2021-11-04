"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateParameter = exports.ArrayParameter = void 0;
const tslib_1 = require("tslib");
const http_1 = (0, tslib_1.__importDefault)(require("http"));
const https_1 = (0, tslib_1.__importDefault)(require("https"));
const iconv_lite_1 = require("iconv-lite");
const querystring_1 = (0, tslib_1.__importDefault)(require("querystring"));
const zlib_1 = (0, tslib_1.__importDefault)(require("zlib"));
const tapjaw_connector_1 = require("../contracts/tapjaw-connector");
const deepmerge_1 = (0, tslib_1.__importDefault)(require("deepmerge"));
class ArrayParameter {
    constructor(...values) {
        this.values = values;
    }
}
exports.ArrayParameter = ArrayParameter;
class DuplicateParameter {
    constructor(...values) {
        this.values = values;
    }
}
exports.DuplicateParameter = DuplicateParameter;
const DEFAULT_TIMEOUT = 30000;
/**
 * The default HTTP and HTTPS API request wrapper.
 */
class TapjawHttpConnector {
    constructor(host, port = 80, enableHttps = true, security) {
        this.host = host;
        this.port = port;
        this.enableHttps = enableHttps;
        this.security = security;
        /**
         * Containers the response object of the previous request.
         */
        this.lastResponse = null;
        if (enableHttps && (port === 80 || !port)) {
            this.port = 443;
        }
    }
    /**
     * Whether a authentication wrapper has been injected into the connector or not.
     */
    hasSecurity() {
        return Boolean(this.security);
    }
    getLastResponse() {
        return this.lastResponse;
    }
    /**
     * Set the character set encoding to decode the API response data before encoding or returning.
     *
     * @param encoding  string|null
     */
    setDecoding(encoding) {
        if (!encoding) {
            delete this.useDecoding;
        }
        if ((0, iconv_lite_1.encodingExists)(encoding)) {
            throw new tapjaw_connector_1.TapjawConnectorError(`Unsupported decoding: ${encoding || 'not set'}`);
        }
        this.useDecoding = encoding;
    }
    /**
     * Set the character set encoding on the response data.
     *
     * @param encoding string|null
     */
    setEncoding(encoding) {
        if (!encoding) {
            delete this.useEncoding;
        }
        if (!(0, iconv_lite_1.encodingExists)(encoding)) {
            throw new tapjaw_connector_1.TapjawConnectorError(`Unsupported encoding: ${encoding || 'not set'}`);
        }
        this.useEncoding = encoding;
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
    async get(uri, query, headers, timeout = DEFAULT_TIMEOUT) {
        const options = {
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
    async delete(uri, query, headers, timeout = DEFAULT_TIMEOUT) {
        const options = {
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
    async post(uri, query, body, headers, timeout = DEFAULT_TIMEOUT) {
        if (typeof body === 'object') {
            body = querystring_1.default.stringify(body);
        }
        const options = {
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
    async postJson(uri, query, json, headers, timeout = DEFAULT_TIMEOUT) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        }
        const options = {
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
    stringifyParameters(query) {
        const queryParams = [];
        for (const [key, value] of Object.entries(query)) {
            if (value instanceof ArrayParameter) {
                for (const item of value.values) {
                    queryParams.push(`${key}[]=${querystring_1.default.escape(item)}`);
                }
            }
            else if (value instanceof DuplicateParameter) {
                for (const item of value.values) {
                    queryParams.push(`${key}=${querystring_1.default.escape(item)}`);
                }
            }
            else {
                queryParams.push(`${key}=${querystring_1.default.escape(value)}`);
            }
        }
        return queryParams.join('&');
    }
    /**
     * Apply security authentication data to request options.
     *
     * @param options https.RequestOptions
     */
    async applySecurity(options) {
        if (!this.security) {
            // No security implemented
            return options;
        }
        const updatedOptions = (await this.security.authenticate(options));
        return (0, deepmerge_1.default)(options, updatedOptions);
    }
    /**
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    async getResponse(options, writeBody) {
        options = await this.applySecurity(options);
        return new Promise((resolve, reject) => {
            const requestImpl = this.enableHttps ? https_1.default.request : http_1.default.request;
            const connectorRequest = requestImpl(options, (response) => {
                this.lastResponse = response;
                if (response.statusCode !== 200) {
                    const error = new tapjaw_connector_1.TapjawConnectorError(`HTTP Status code was ${response?.statusCode || 'not set'}.`);
                    reject(error);
                }
                const buffer = [];
                response.on('data', (data) => buffer.push(Buffer.from(data, 'binary')));
                response.on('end', () => {
                    let contentBuffer = Buffer.concat(buffer);
                    if (!contentBuffer) {
                        reject(new tapjaw_connector_1.TapjawConnectorError('Empty content buffer'));
                    }
                    if (this.enableGzip) {
                        contentBuffer = zlib_1.default.gunzipSync(contentBuffer);
                    }
                    if (this.useDecoding) {
                        contentBuffer = Buffer.from((0, iconv_lite_1.decode)(contentBuffer, this.useDecoding));
                    }
                    // return raw string buffer.
                    resolve(this.useEncoding
                        ? (0, iconv_lite_1.encode)(contentBuffer.toString(), this.useEncoding).toString()
                        : contentBuffer.toString());
                });
                response.on('error', reject);
            });
            connectorRequest
                .on('timeout', () => {
                connectorRequest.abort();
                reject(new tapjaw_connector_1.TapjawConnectorError(`${options.hostname || 'not set'} Timed out after ${options.timeout || '(not set)'}ms`));
            })
                .on('error', reject);
            if (writeBody) {
                connectorRequest.write(writeBody);
            }
            connectorRequest.end();
        });
    }
}
exports.default = TapjawHttpConnector;
