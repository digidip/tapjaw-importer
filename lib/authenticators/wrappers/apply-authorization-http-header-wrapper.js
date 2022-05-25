"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
class ApplyAuthorizationHttpHeaderWrapper {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    async authenticate(requestOptionContainer) {
        if (this.authenticator.isAuthenticated()) {
            // Apply Authorization header.
            return this.applyAuthorizationHeader(requestOptionContainer);
        }
        // Generate the Authorization token.
        this.authenticationData = await this.authenticator.authenticate();
        if (typeof this.authenticationData !== 'object') {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No Authorization header data recieved from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`);
        }
        return this.applyAuthorizationHeader(requestOptionContainer);
    }
    applyAuthorizationHeader(options) {
        return {
            ...options,
            headers: {
                ...options.headers,
                ...this.authenticationData
            }
        };
    }
}
exports.default = ApplyAuthorizationHttpHeaderWrapper;
