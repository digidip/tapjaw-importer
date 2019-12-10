"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
class ApplyAuthorizationHttpHeaderWrapper {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    authenticate(requestOptionContainer) {
        return new Promise(async (resolve, reject) => {
            if (this.authenticator.isAuthenticated()) {
                // Apply Authorization header.
                return resolve(this.applyAuthorizationHeader(requestOptionContainer));
            }
            // Generate the Authorization token.
            this.authenticationData = (await this.authenticator
                .authenticate()
                .catch(reject));
            if (!this.authenticationData) {
                return reject(new tapjaw_authenticator_1.TapjawAuthenticatorError(`No Authorization header data recieved from authenticator: ${this
                    .authenticator.constructor.name || "Unknown"}`));
            }
            resolve(this.applyAuthorizationHeader(requestOptionContainer));
        });
    }
    applyAuthorizationHeader(options) {
        return Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), this.authenticationData) });
    }
}
exports.default = ApplyAuthorizationHttpHeaderWrapper;
