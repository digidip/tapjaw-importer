"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const iconv_lite_1 = require("iconv-lite");
const querystring = require("querystring");
const zlib = require("zlib");
const tapjaw_connector_1 = require("../contracts/tapjaw-connector");
class TapjawHttpConnector {
    constructor(host, port = 80, security) {
        this.host = host;
        this.port = port;
        this.security = security;
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
     * Set the authenticator response to connector.
     *
     * @param authenticatorData any
     *
     * @return void
     */
    setAuthenticatorData(authenticatorData) {
        this.authenticatorData = authenticatorData;
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
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'GET',
            headers
        };
        return new Promise((resolve, reject) => {
            const connectorRequest = https.request(options, (response) => this.responseHandler(resolve, reject, response));
            connectorRequest.end();
        });
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
        const options = {
            hostname: this.host,
            port: this.port,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'POST',
            headers
        };
        return new Promise((resolve, reject) => {
            const connectorRequest = https.request(options, (response) => this.responseHandler(resolve, reject, response));
            connectorRequest.end();
        });
    }
    /**
     * Has a security authenticator been configured?
     *
     * @return boolean
     */
    securityEnabled() {
        return Boolean(this.security);
    }
    /**
     * Has the security authenticator successfully authenticated.
     *
     * @return boolean
     */
    isAuthenticated() {
        return Boolean(this.security && this.security.isAuthenticated());
    }
    /**
     * HTTP Response handler.
     *
     * @param resolve   (args?: any) => void
     * @param reject    (args?: any) => void
     * @param response  IncomingMessage
     */
    responseHandler(resolve, reject, response) {
        if (response.statusCode !== 200) {
            const error = new tapjaw_connector_1.TapjawConnectorError(`HTTP Status code was ${response.statusCode}.`);
            // error.statusCode = response.statusCode;
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
                contentBuffer = zlib.gunzipSync(contentBuffer);
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
    }
}
exports.default = TapjawHttpConnector;
