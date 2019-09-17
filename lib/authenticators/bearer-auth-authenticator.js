"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BearerAuthAuthenticator {
    constructor(bearerToken) {
        this.bearerToken = bearerToken;
        this.authenticated = false;
        this.header = {
            Authorization: `Bearer ${bearerToken}`
        };
    }
    isAuthenticated() {
        return this.authenticated;
    }
    async authenticate(connector) {
        return new Promise(resolve => {
            this.authenticated = true;
            connector.setAuthenticatorData(this.header);
            resolve();
        });
    }
}
exports.default = BearerAuthAuthenticator;
