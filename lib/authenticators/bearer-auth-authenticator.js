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
    async authenticate() {
        this.authenticated = true;
        return Promise.resolve(this.header);
    }
}
exports.default = BearerAuthAuthenticator;
