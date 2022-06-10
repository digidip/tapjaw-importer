"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
const request_1 = tslib_1.__importDefault(require("./support/request"));
class PrefetchTokenAuthorizationHeaderAuthenticator {
    constructor(apiKey, hostname, path, method = 'POST') {
        this.apiKey = apiKey;
        this.hostname = hostname;
        this.path = path;
        this.method = method;
    }
    isAuthenticated() {
        return Boolean(this.token);
    }
    async authenticate() {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
        const params = new URLSearchParams({
            key: 'general',
            secret: this.apiKey,
        }).toString();
        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers,
        };
        const oauthResponse = await (0, request_1.default)(params, options);
        if (!oauthResponse) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError('No token response was recieved.');
        }
        const oauthJson = JSON.parse(oauthResponse);
        this.token = oauthJson.data.token;
        return {
            Authorization: `Bearer ${this.token}`,
        };
    }
}
exports.default = PrefetchTokenAuthorizationHeaderAuthenticator;
