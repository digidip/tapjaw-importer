"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
const request_1 = require("./support/request");
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
    }
    isAuthenticated() {
        return this.authenticated;
    }
    async authenticate() {
        return new Promise(async (resolve, reject) => {
            if (this.isAuthenticated() && this.getLastResponse()) {
                return resolve(this.getLastResponse());
            }
            const headers = {
                Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            };
            const params = querystring.stringify(this.postParams);
            const options = {
                hostname: this.hostname,
                path: this.path,
                method: this.method,
                headers,
            };
            this.authenticated = false;
            this.lastResponse = null;
            try {
                const oauthResponse = await request_1.default(params, options, this.responseEncoding);
                if (oauthResponse) {
                    this.authenticated = true;
                    this.lastResponse = oauthResponse;
                    return resolve(oauthResponse);
                }
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
