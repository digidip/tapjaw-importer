"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomHeaderAuthenticator {
    constructor(headers) {
        this.headers = {};
        for (const [name, value] of headers) {
            this.headers[name] = value;
        }
    }
    isAuthenticated() {
        return true;
    }
    async authenticate() {
        return Promise.resolve(this.headers);
    }
}
exports.default = CustomHeaderAuthenticator;
