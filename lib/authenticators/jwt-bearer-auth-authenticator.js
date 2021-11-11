"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bearer_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("./bearer-auth-authenticator"));
class JWTBearerAuthAuthenticator {
    constructor(jwtBuilder) {
        this.jwtBuilder = jwtBuilder;
        this.authenticated = false;
    }
    isAuthenticated() {
        return this.authenticated;
    }
    async authenticate() {
        const bearer = new bearer_auth_authenticator_1.default(await this.jwtBuilder.getToken());
        this.authenticated = true;
        return bearer.authenticate();
    }
}
exports.default = JWTBearerAuthAuthenticator;
