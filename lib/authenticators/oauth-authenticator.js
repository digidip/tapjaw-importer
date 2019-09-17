"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const querystring = require("querystring");
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
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
    async authenticate(connector) {
        return new Promise(async (resolve, reject) => {
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
            const oauthResponse = await this.request(params, options).catch(reject);
            if (oauthResponse) {
                this.authenticated = true;
                this.lastResponse = oauthResponse;
                connector.setAuthenticatorData(oauthResponse);
                return resolve();
            }
            reject(new tapjaw_authenticator_1.TapjawAuthenticatorError('No oauth response was recieved.'));
        });
    }
    getLastResponse() {
        return this.lastResponse;
    }
    async request(params, options) {
        return new Promise((resolve, reject) => {
            const authReq = https.request(options, response => {
                let buffer = '';
                response.setEncoding(this.responseEncoding);
                response.on('data', (data) => buffer += data);
                response.on('end', () => resolve(buffer));
                response.on('error', (error) => reject(error));
            });
            authReq.write(params);
            authReq.end();
        });
    }
}
exports.default = OauthAuthenticator;
