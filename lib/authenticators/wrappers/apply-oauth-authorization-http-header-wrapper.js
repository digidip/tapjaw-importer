"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
const oauth_authenticator_1 = require("../oauth-authenticator");
class ApplyOauthAuthorizationHttpHeaderWrapper {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    async authenticate(requestOptionContainer) {
        // Has the OAuth process already run?
        if (this.authenticator.isAuthenticated()) {
            // Does the authentication data actually exist?
            if (!(0, oauth_authenticator_1.isOauthResponse)(this.authenticationData)) {
                this.authenticationData = undefined;
                throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No "access_token" property provided from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`);
            }
            // Apply and respond with cached data.
            return this.applyAuthorizationHeader(requestOptionContainer, this.authenticationData.access_token);
        }
        this.authenticationData = await this.authenticator.authenticate();
        if (!this.authenticationData) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No OAuth data recieved from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`);
        }
        if (!this.authenticationData.access_token) {
            this.authenticationData = undefined;
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No "access_token" property provided from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`);
        }
        return this.applyAuthorizationHeader(requestOptionContainer, this.authenticationData.access_token);
    }
    applyAuthorizationHeader(options, accessToken) {
        return {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        };
    }
}
exports.default = ApplyOauthAuthorizationHttpHeaderWrapper;
