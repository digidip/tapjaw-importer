"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOauthResponse = void 0;
const tslib_1 = require("tslib");
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
const request_1 = (0, tslib_1.__importDefault)(require("./support/request"));
const isOauthResponse = (obj) => {
    return Boolean(obj && typeof obj === 'object' && 'access_token' in obj);
};
exports.isOauthResponse = isOauthResponse;
class OauthAuthenticator {
    constructor(clientId, clientSecret, hostname, path, postParams, method = 'POST', responseEncoding = 'utf8') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.hostname = hostname;
        this.path = path;
        this.postParams = postParams;
        this.method = method;
        this.responseEncoding = responseEncoding;
        this.authenticated = false;
        this.lastResponse = null;
    }
    isAuthenticated() {
        return this.authenticated;
    }
    async authenticate() {
        if (this.isAuthenticated()) {
            const lastResponse = this.getLastResponse();
            if (lastResponse !== null) {
                return lastResponse;
            }
        }
        const headers = {
            Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        // @todo migrate to URLSearchParams in future.
        const params = new URLSearchParams(this.postParams).toString();
        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers
        };
        this.authenticated = false;
        this.lastResponse = null;
        const oauthResponse = await (0, request_1.default)(params, options, this.responseEncoding);
        if (!oauthResponse) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError('No oauth response was recieved.');
        }
        const oauthJson = JSON.parse(oauthResponse);
        if (!oauthJson) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError('Invalid OAuth JSON');
        }
        this.authenticated = true;
        this.lastResponse = oauthJson;
        return oauthJson;
    }
    getLastResponse() {
        return this.lastResponse;
    }
}
exports.default = OauthAuthenticator;
