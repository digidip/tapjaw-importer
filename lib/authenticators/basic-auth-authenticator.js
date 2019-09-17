"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicAuthAuthenticator {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.authenticated = false;
        this.header = {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
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
exports.default = BasicAuthAuthenticator;
