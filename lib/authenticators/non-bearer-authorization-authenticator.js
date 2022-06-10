"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bearer_auth_authenticator_1 = tslib_1.__importDefault(require("./bearer-auth-authenticator"));
class NonBearerAuthorizationAuthenticator extends bearer_auth_authenticator_1.default {
    async authenticate() {
        const headers = await super.authenticate();
        headers.Authorization = headers.Authorization.replace('Bearer ', '');
        return Promise.resolve(headers);
    }
}
exports.default = NonBearerAuthorizationAuthenticator;
