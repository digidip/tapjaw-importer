"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
const request_1 = tslib_1.__importDefault(require("./support/request"));
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
        return new Promise(async (resolve, reject) => {
            if (this.isAuthenticated()) {
                const lastResponse = this.getLastResponse();
                if (lastResponse !== null) {
                    return resolve(lastResponse);
                }
            }
            const headers = {
                Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            };
            const params = querystring_1.default.stringify(this.postParams);
            const options = {
                hostname: this.hostname,
                path: this.path,
                method: this.method,
                headers
            };
            this.authenticated = false;
            this.lastResponse = null;
            try {
                const oauthResponse = await request_1.default(params, options, this.responseEncoding);
                if (!oauthResponse) {
                    throw new tapjaw_authenticator_1.TapjawAuthenticatorError('No oauth response was recieved.');
                }
                const oauthJson = JSON.parse(oauthResponse);
                if (!oauthJson) {
                    throw new tapjaw_authenticator_1.TapjawAuthenticatorError('Invalid OAuth JSON');
                }
                this.authenticated = true;
                this.lastResponse = oauthJson;
                return resolve(oauthJson);
            }
            catch (error) {
                reject(error);
            }
            reject(new tapjaw_authenticator_1.TapjawAuthenticatorError('No oauth response was recieved.'));
        });
    }
    getLastResponse() {
        return this.lastResponse;
    }
}
exports.default = OauthAuthenticator;
