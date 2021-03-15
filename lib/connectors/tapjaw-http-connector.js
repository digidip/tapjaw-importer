"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = require("http");
const https_1 = tslib_1.__importDefault(require("https"));
const iconv_lite_1 = require("iconv-lite");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const zlib_1 = tslib_1.__importDefault(require("zlib"));
const tapjaw_connector_1 = require("../contracts/tapjaw-connector");
const deepmerge = require('deepmerge');
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
        if (iconv_lite_1.encodingExists(encoding)) {
            throw new tapjaw_connector_1.TapjawConnectorError(`Unsupported decoding: ${encoding}`);
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
        if (!iconv_lite_1.encodingExists(encoding)) {
            throw new tapjaw_connector_1.TapjawConnectorError(`Unsupported encoding: ${encoding}`);
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
    async get(uri, query, headers) {
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0
                ? `${uri}?${querystring_1.default.stringify(query)}`
                : uri,
            method: 'GET',
            headers
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
    async delete(uri, query, headers) {
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0
                ? `${uri}?${querystring_1.default.stringify(query)}`
                : uri,
            method: 'DELETE',
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
    async post(uri, query, body, headers) {
        if (typeof body === 'object') {
            body = querystring_1.default.stringify(body);
        }
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0
                ? `${uri}?${querystring_1.default.stringify(query)}`
                : uri,
            method: 'POST',
            headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) })
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
    async postJson(uri, query, json, headers) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        }
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0
                ? `${uri}?${querystring_1.default.stringify(query)}`
                : uri,
            method: 'POST',
            headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(json) })
        };
        return this.getResponse(options);
    }
    /**
     * Apply security authentication data to request options.
     *
     * @param options https.RequestOptions
     */
    applySecurity(options) {
        return new Promise(async (resolve, reject) => {
            if (!this.security) {
                // No security implemented
                return resolve(options);
            }
            const updatedOptions = await this.security
                .authenticate(options)
                .catch(reject);
            resolve(deepmerge(options, updatedOptions));
        });
    }
    /**
     * http/https request handler
     *
     * @param options https.RequestOptions
     * @param writeBody string|undefined
     */
    getResponse(options, writeBody) {
        return new Promise(async (resolve, reject) => {
            options = await this.applySecurity(options);
            const requestImpl = this.enableHttps ? https_1.default.request : http_1.request;
            const connectorRequest = requestImpl(options, (response) => {
                this.lastResponse = response;
                if (response.statusCode !== 200) {
                    const error = new tapjaw_connector_1.TapjawConnectorError(`HTTP Status code was ${response.statusCode}.`);
                    reject(error);
                }
                let buffer = [];
                response.on('data', (data) => buffer.push(Buffer.from(data, 'binary')));
                response.on('end', async () => {
                    let contentBuffer = Buffer.concat(buffer);
                    if (!contentBuffer) {
                        reject(new tapjaw_connector_1.TapjawConnectorError('Empty content buffer'));
                    }
                    if (this.enableGzip) {
                        contentBuffer = zlib_1.default.gunzipSync(contentBuffer);
                    }
                    if (this.useDecoding) {
                        contentBuffer = Buffer.from(iconv_lite_1.decode(contentBuffer, this.useDecoding));
                    }
                    // return raw string buffer.
                    resolve(this.useEncoding
                        ? iconv_lite_1.encode(contentBuffer.toString(), this.useEncoding).toString()
                        : contentBuffer.toString());
                });
                response.on('error', reject);
            });
            if (writeBody) {
                connectorRequest.write(writeBody);
            }
            connectorRequest.end();
        });
    }
}
exports.default = TapjawHttpConnector;
