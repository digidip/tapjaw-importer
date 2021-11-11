"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTSecurity = exports.createOAuthSecurity = exports.createBearerSecurity = exports.createBasicSecurity = void 0;
const tslib_1 = require("tslib");
const apply_authorization_http_header_wrapper_1 = (0, tslib_1.__importDefault)(require("../authenticators/wrappers/apply-authorization-http-header-wrapper"));
const apply_oauth_authorization_http_header_wrapper_1 = (0, tslib_1.__importDefault)(require("../authenticators/wrappers/apply-oauth-authorization-http-header-wrapper"));
const basic_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../authenticators/basic-auth-authenticator"));
const bearer_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../authenticators/bearer-auth-authenticator"));
const oauth_authenticator_1 = (0, tslib_1.__importDefault)(require("../authenticators/oauth-authenticator"));
const apply_jwt_http_header_wrapper_1 = (0, tslib_1.__importDefault)(require("../authenticators/wrappers/apply-jwt-http-header-wrapper"));
const createBasicSecurity = (username, password) => new apply_authorization_http_header_wrapper_1.default(new basic_auth_authenticator_1.default(username, password));
exports.createBasicSecurity = createBasicSecurity;
const createBearerSecurity = (token) => new apply_authorization_http_header_wrapper_1.default(new bearer_auth_authenticator_1.default(token));
exports.createBearerSecurity = createBearerSecurity;
const createOAuthSecurity = (clientId, clientSecret, hostname, path, postParams, method = 'POST', responseEncoding = 'utf8') => new apply_oauth_authorization_http_header_wrapper_1.default(new oauth_authenticator_1.default(clientId, clientSecret, hostname, path, postParams, method, responseEncoding));
exports.createOAuthSecurity = createOAuthSecurity;
const createJWTSecurity = (jwtBuilder) => {
    return new apply_jwt_http_header_wrapper_1.default(jwtBuilder);
};
exports.createJWTSecurity = createJWTSecurity;
// const createSessionSecurity = (
//     loginPageUrl: string,
//     formSelector: string,
//     fillables: Map<FormFieldName, FormFieldValue>
// ) =>
//     new TpajawApplyCookieHttpHeaderWrapper(
//         new TapjawSessionAuthenticator(
//             loginPageUrl,
//             new TapjawHtmlFormExtractor(formSelector, loginPageUrl),
//             new TapjawRequestFormBuilder(fillables)
//         ),
//         loginPageUrl
//     );
