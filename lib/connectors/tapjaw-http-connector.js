"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapjawHttpConnectorProtocol = exports.TapjawHttpConnectorCharSet = exports.DuplicateParameter = exports.ArrayParameter = void 0;
const tslib_1 = require("tslib");
const http_1 = (0, tslib_1.__importDefault)(require("http"));
const https_1 = (0, tslib_1.__importDefault)(require("https"));
const iconv_lite_1 = require("iconv-lite");
const querystring_1 = (0, tslib_1.__importDefault)(require("querystring"));
const zlib_1 = (0, tslib_1.__importDefault)(require("zlib"));
const deepmerge_1 = (0, tslib_1.__importDefault)(require("deepmerge"));
const url_1 = require("url");
const tapjaw_connector_error_1 = (0, tslib_1.__importDefault)(require("../errors/tapjaw-connector-error"));
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
 * Known supported character sets used by {@link TapjawHttpConnector}, {@link TapjawMetadata.Connector.Encode}
 * and {@link TapjawMetadata.Connector.Encode}.
 * @enum
 */
var TapjawHttpConnectorCharSet;
(function (TapjawHttpConnectorCharSet) {
    TapjawHttpConnectorCharSet["UTF8"] = "utf-8";
    TapjawHttpConnectorCharSet["LATIN1"] = "iso-8859-1";
})(TapjawHttpConnectorCharSet = exports.TapjawHttpConnectorCharSet || (exports.TapjawHttpConnectorCharSet = {}));
/**
 * Supported protocols for HTTP based connectors.
 * @enum
 */
var TapjawHttpConnectorProtocol;
(function (TapjawHttpConnectorProtocol) {
    TapjawHttpConnectorProtocol["HTTPS"] = "https";
    TapjawHttpConnectorProtocol["HTTP"] = "http";
})(TapjawHttpConnectorProtocol = exports.TapjawHttpConnectorProtocol || (exports.TapjawHttpConnectorProtocol = {}));
/**
 * @module TapjawConnector
 *
 * The default HTTP and HTTPS API connector.
 */
class TapjawHttpConnector {
    constructor(host, port = 80, protocol = TapjawHttpConnectorProtocol.HTTPS, security) {
        this.host = host;
        this.port = port;
        this.protocol = protocol;
        this.security = security;
        /**
         * Containers the response object of the previous request.
         */
        this.lastResponse = null;
        if (protocol === TapjawHttpConnectorProtocol.HTTPS && (port === 80 || !port)) {
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
     * @param encoding  TapjawHttpConnectorProtocol|string|null
     */
    setDecoding(encoding) {
        if (encoding === null || !encoding) {
            this.useDecoding = void 0;
            return;
        }
        if (!(0, iconv_lite_1.encodingExists)(encoding)) {
            throw new tapjaw_connector_error_1.default(`Unsupported decoding: ${encoding || "not set"}`, this);
        }
        this.useDecoding = encoding;
    }
    /**
     * Set the character set encoding on the response data.
     *
     * @param encoding {@link TapjawHttpConnectorProtocol}|string|null
     */
    setEncoding(encoding) {
        if (encoding === null || !encoding) {
            this.useEncoding = void 0;
            return;
        }
        if (!(0, iconv_lite_1.encodingExists)(encoding)) {
            throw new tapjaw_connector_error_1.default(`Unsupported encoding: ${encoding || "not set"}`, this);
        }
        this.useEncoding = encoding;
    }
    /**
     * Send a GET request to the API.
     *
     * @param uri       string
     * @param query     {@link TapjawHttpQueryParameters}
     * @param headers   {@link TapjawHttpHeaders} (optional)
     *
     * @returns {@link TapjawConnectorResponse}
     */
    async get(uri, query, headers, timeout = DEFAULT_TIMEOUT) {
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: "GET",
            headers,
            timeout
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
     * @returns {@link TapjawConnectorResponse}
     */
    async delete(uri, query, headers, timeout = DEFAULT_TIMEOUT) {
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: "DELETE",
            headers,
            timeout
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
     * @returns {@link TapjawConnectorResponse}
     */
    async post(uri, query, body, headers, timeout = DEFAULT_TIMEOUT) {
        if (typeof body === "object") {
            body = new url_1.URLSearchParams(body).toString();
        }
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(body)
            },
            timeout
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
     * @returns {@link TapjawConnectorResponse}
     */
    async postJson(uri, query, json, headers, timeout = DEFAULT_TIMEOUT) {
        if (typeof json !== "string") {
            json = JSON.stringify(json);
        }
        const options = {
            hostname: this.host,
            port: this.port,
            path: Object.keys(query).length > 0 ? `${uri}?${this.stringifyParameters(query)}` : uri,
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(json)
            },
            timeout
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
        return queryParams.join("&");
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
    getProtocolRequest() {
        switch (true) {
            case this.protocol === TapjawHttpConnectorProtocol.HTTPS:
                return https_1.default.request;
            case this.protocol === TapjawHttpConnectorProtocol.HTTP:
                return http_1.default.request;
            default:
                throw new tapjaw_connector_error_1.default(`Invalid protocol: ${String(this.protocol)}`, this);
        }
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
            const connectorRequest = this.getProtocolRequest()(options, (response) => {
                this.lastResponse = response;
                if (response.statusCode !== 200) {
                    const error = new tapjaw_connector_error_1.default(`HTTP Status code was ${response?.statusCode || "not set"}.`, this);
                    reject(error);
                }
                const buffer = [];
                response.on("data", (data) => buffer.push(Buffer.from(data, "binary")));
                response.on("end", () => {
                    let contentBuffer = Buffer.concat(buffer);
                    if (!contentBuffer) {
                        reject(new tapjaw_connector_error_1.default("Empty content buffer", this));
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
                response.on("error", reject);
            });
            connectorRequest
                .on("timeout", () => {
                connectorRequest.abort();
                reject(new tapjaw_connector_error_1.default(`${options.hostname || "not set"} Timed out after ${options.timeout || "(not set)"}ms`, this));
            })
                .on("error", reject);
            if (writeBody) {
                connectorRequest.write(writeBody);
            }
            connectorRequest.end();
        });
    }
}
exports.default = TapjawHttpConnector;
