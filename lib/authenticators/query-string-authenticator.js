"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
class QueryStringAuthenticator {
    constructor(queryParameters) {
        this.queryParameters = queryParameters;
    }
    isAuthenticated() {
        return Object.keys(this.queryParameters).length > 0;
    }
    async authenticate() {
        if (!this.isAuthenticated()) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError('No QueryParameters provided to authenticator');
        }
        return Promise.resolve(this.queryParameters);
    }
}
exports.default = QueryStringAuthenticator;
