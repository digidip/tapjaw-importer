"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_bearer_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../jwt-bearer-auth-authenticator"));
const apply_authorization_http_header_wrapper_1 = (0, tslib_1.__importDefault)(require("./apply-authorization-http-header-wrapper"));
class ApplyJwtHttpHeaderWrapper extends apply_authorization_http_header_wrapper_1.default {
    constructor(jwtGenerator) {
        super(new jwt_bearer_auth_authenticator_1.default(jwtGenerator));
    }
}
exports.default = ApplyJwtHttpHeaderWrapper;
