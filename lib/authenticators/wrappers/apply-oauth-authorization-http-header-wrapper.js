"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
class ApplyOauthAuthorizationHttpHeaderWrapper {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    authenticate(requestOptionContainer) {
        return new Promise(async (resolve, reject) => {
            // Has the OAuth process already run?
            if (this.authenticator.isAuthenticated()) {
                // Does the authentication data actually exist?
                if (!this.authenticationData || !this.authenticationData.access_token) {
                    this.authenticationData = undefined;
                    return reject(new tapjaw_authenticator_1.TapjawAuthenticatorError(`No "access_token" property provided from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`));
                }
                // Apply and respond with cached data.
                return resolve(this.applyAuthorizationHeader(requestOptionContainer, this.authenticationData.access_token));
            }
            try {
                this.authenticationData = await this.authenticator.authenticate();
            }
            catch (error) {
                return reject(error);
            }
            if (!this.authenticationData) {
                return reject(new tapjaw_authenticator_1.TapjawAuthenticatorError(`No OAuth data recieved from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`));
            }
            if (!this.authenticationData.access_token) {
                this.authenticationData = undefined;
                return reject(new tapjaw_authenticator_1.TapjawAuthenticatorError(`No "access_token" property provided from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`));
            }
            resolve(this.applyAuthorizationHeader(requestOptionContainer, this.authenticationData.access_token));
        });
    }
    applyAuthorizationHeader(options, accessToken) {
        return Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), { Authorization: `Bearer ${accessToken}` }) });
    }
}
exports.default = ApplyOauthAuthorizationHttpHeaderWrapper;
