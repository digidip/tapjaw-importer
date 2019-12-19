"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var command_1 = require("@oclif/command");
exports.run = command_1.run;
var tapjaw_message_1 = require("./contracts/tapjaw-message");
exports.TapjawMessage = tapjaw_message_1.default;
var tapjaw_command_1 = require("./contracts/tapjaw-command");
exports.TapjawCommand = tapjaw_command_1.default;
// Connectors
var tapjaw_http_connector_1 = require("./connectors/tapjaw-http-connector");
exports.TapjawHttpConnector = tapjaw_http_connector_1.default;
// export { default as TapjawSoapConnector } from './connectors/tapjaw-soap-connector';
// Authenticators
const basic_auth_authenticator_1 = tslib_1.__importDefault(require("./authenticators/basic-auth-authenticator"));
exports.TapjawBasicAuthenticator = basic_auth_authenticator_1.default;
const bearer_auth_authenticator_1 = tslib_1.__importDefault(require("./authenticators/bearer-auth-authenticator"));
exports.TapjawBearerAuthenticator = bearer_auth_authenticator_1.default;
const oauth_authenticator_1 = tslib_1.__importDefault(require("./authenticators/oauth-authenticator"));
exports.TapjawOauthAuthenticator = oauth_authenticator_1.default;
const session_authenticator_1 = tslib_1.__importDefault(require("./authenticators/session-authenticator"));
exports.TapjawSessionAuthenticator = session_authenticator_1.default;
const html_form_extractor_1 = tslib_1.__importDefault(require("./authenticators/support/html-form-extractor"));
exports.TapjawHtmlFormExtractor = html_form_extractor_1.default;
const request_form_builder_1 = tslib_1.__importDefault(require("./authenticators/support/request-form-builder"));
exports.TapjawRequestFormBuilder = request_form_builder_1.default;
const apply_authorization_http_header_wrapper_1 = tslib_1.__importDefault(require("./authenticators/wrappers/apply-authorization-http-header-wrapper"));
exports.TapjawApplyAuthorizationHttpHeaderWrapper = apply_authorization_http_header_wrapper_1.default;
const apply_oauth_authorization_http_header_wrapper_1 = tslib_1.__importDefault(require("./authenticators/wrappers/apply-oauth-authorization-http-header-wrapper"));
exports.TapjawApplyOauthAuthorizationHttpHeaderWrapper = apply_oauth_authorization_http_header_wrapper_1.default;
const apply_cookie_http_header_wrapper_1 = tslib_1.__importDefault(require("./authenticators/wrappers/apply-cookie-http-header-wrapper"));
exports.TpajawApplyCookieHttpHeaderWrapper = apply_cookie_http_header_wrapper_1.default;
const createBasicSecurity = (username, password) => new apply_authorization_http_header_wrapper_1.default(new basic_auth_authenticator_1.default(username, password));
exports.createBasicSecurity = createBasicSecurity;
const createBearerSecurity = (token) => new apply_authorization_http_header_wrapper_1.default(new bearer_auth_authenticator_1.default(token));
exports.createBearerSecurity = createBearerSecurity;
const createOAuthSecurity = (clientId, clientSecret, hostname, path, postParams, method = 'POST', responseEncoding = 'utf8') => new apply_oauth_authorization_http_header_wrapper_1.default(new oauth_authenticator_1.default(clientId, clientSecret, hostname, path, postParams, method, responseEncoding));
exports.createOAuthSecurity = createOAuthSecurity;
const createSessionSecurity = (loginPageUrl, formSelector, fillables) => new apply_cookie_http_header_wrapper_1.default(new session_authenticator_1.default(loginPageUrl, new html_form_extractor_1.default(formSelector, loginPageUrl), new request_form_builder_1.default(fillables)), loginPageUrl);
exports.createSessionSecurity = createSessionSecurity;
// Iterators
var stdout_iterator_1 = require("./iterators/stdout-iterator");
exports.StdoutIterator = stdout_iterator_1.default;
var output_iterator_1 = require("./iterators/output-iterator");
exports.OutputIterator = output_iterator_1.default;
// Support
var sort_object_arrays_1 = require("./support/sort-object-arrays");
exports.sortObjectArrays = sort_object_arrays_1.default;
// Parsers
var xml_to_json_1 = require("./parsers/xml-to-json");
exports.xmlToJson = xml_to_json_1.default;
var csv_to_json_1 = require("./parsers/csv-to-json");
exports.csvToJson = csv_to_json_1.default;
// Configs
var dot_env_config_1 = require("./configs/dot-env-config");
exports.DotEnvConfig = dot_env_config_1.default;
var tapjaw_message_config_1 = require("./configs/tapjaw-message-config");
exports.TapjawMessageConfig = tapjaw_message_config_1.default;
