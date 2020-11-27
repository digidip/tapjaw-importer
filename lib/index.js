"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapjawMessageConfig = exports.DotEnvConfig = exports.csvToJson = exports.xmlToJson = exports.sortObjectArrays = exports.OutputIterator = exports.StdoutIterator = exports.createOAuthSecurity = exports.createBearerSecurity = exports.createBasicSecurity = exports.TapjawApplyOauthAuthorizationHttpHeaderWrapper = exports.TapjawApplyAuthorizationHttpHeaderWrapper = exports.TapjawRequestFormBuilder = exports.TapjawHtmlFormExtractor = exports.TapjawOauthAuthenticator = exports.TapjawBearerAuthenticator = exports.TapjawBasicAuthenticator = exports.TapjawHttpConnector = exports.TapjawCommand = exports.TapjawMessage = void 0;
const tslib_1 = require("tslib");
var tapjaw_message_1 = require("./contracts/tapjaw-message");
Object.defineProperty(exports, "TapjawMessage", { enumerable: true, get: function () { return tslib_1.__importDefault(tapjaw_message_1).default; } });
var tapjaw_command_1 = require("./contracts/tapjaw-command");
Object.defineProperty(exports, "TapjawCommand", { enumerable: true, get: function () { return tslib_1.__importDefault(tapjaw_command_1).default; } });
// Connectors
var tapjaw_http_connector_1 = require("./connectors/tapjaw-http-connector");
Object.defineProperty(exports, "TapjawHttpConnector", { enumerable: true, get: function () { return tslib_1.__importDefault(tapjaw_http_connector_1).default; } });
// export { default as TapjawSoapConnector } from './connectors/tapjaw-soap-connector';
// Authenticators
const basic_auth_authenticator_1 = tslib_1.__importDefault(require("./authenticators/basic-auth-authenticator"));
Object.defineProperty(exports, "TapjawBasicAuthenticator", { enumerable: true, get: function () { return basic_auth_authenticator_1.default; } });
const bearer_auth_authenticator_1 = tslib_1.__importDefault(require("./authenticators/bearer-auth-authenticator"));
Object.defineProperty(exports, "TapjawBearerAuthenticator", { enumerable: true, get: function () { return bearer_auth_authenticator_1.default; } });
const oauth_authenticator_1 = tslib_1.__importDefault(require("./authenticators/oauth-authenticator"));
Object.defineProperty(exports, "TapjawOauthAuthenticator", { enumerable: true, get: function () { return oauth_authenticator_1.default; } });
// import { default as TapjawSessionAuthenticator } from './authenticators/session-authenticator';
const html_form_extractor_1 = tslib_1.__importDefault(require("./authenticators/support/html-form-extractor"));
Object.defineProperty(exports, "TapjawHtmlFormExtractor", { enumerable: true, get: function () { return html_form_extractor_1.default; } });
const request_form_builder_1 = tslib_1.__importDefault(require("./authenticators/support/request-form-builder"));
Object.defineProperty(exports, "TapjawRequestFormBuilder", { enumerable: true, get: function () { return request_form_builder_1.default; } });
const apply_authorization_http_header_wrapper_1 = tslib_1.__importDefault(require("./authenticators/wrappers/apply-authorization-http-header-wrapper"));
Object.defineProperty(exports, "TapjawApplyAuthorizationHttpHeaderWrapper", { enumerable: true, get: function () { return apply_authorization_http_header_wrapper_1.default; } });
const apply_oauth_authorization_http_header_wrapper_1 = tslib_1.__importDefault(require("./authenticators/wrappers/apply-oauth-authorization-http-header-wrapper"));
Object.defineProperty(exports, "TapjawApplyOauthAuthorizationHttpHeaderWrapper", { enumerable: true, get: function () { return apply_oauth_authorization_http_header_wrapper_1.default; } });
const createBasicSecurity = (username, password) => new apply_authorization_http_header_wrapper_1.default(new basic_auth_authenticator_1.default(username, password));
exports.createBasicSecurity = createBasicSecurity;
const createBearerSecurity = (token) => new apply_authorization_http_header_wrapper_1.default(new bearer_auth_authenticator_1.default(token));
exports.createBearerSecurity = createBearerSecurity;
const createOAuthSecurity = (clientId, clientSecret, hostname, path, postParams, method = 'POST', responseEncoding = 'utf8') => new apply_oauth_authorization_http_header_wrapper_1.default(new oauth_authenticator_1.default(clientId, clientSecret, hostname, path, postParams, method, responseEncoding));
exports.createOAuthSecurity = createOAuthSecurity;
// Iterators
var stdout_iterator_1 = require("./iterators/stdout-iterator");
Object.defineProperty(exports, "StdoutIterator", { enumerable: true, get: function () { return tslib_1.__importDefault(stdout_iterator_1).default; } });
var output_iterator_1 = require("./iterators/output-iterator");
Object.defineProperty(exports, "OutputIterator", { enumerable: true, get: function () { return tslib_1.__importDefault(output_iterator_1).default; } });
// Support
var sort_object_arrays_1 = require("./support/sort-object-arrays");
Object.defineProperty(exports, "sortObjectArrays", { enumerable: true, get: function () { return tslib_1.__importDefault(sort_object_arrays_1).default; } });
// Parsers
var xml_to_json_1 = require("./parsers/xml-to-json");
Object.defineProperty(exports, "xmlToJson", { enumerable: true, get: function () { return tslib_1.__importDefault(xml_to_json_1).default; } });
var csv_to_json_1 = require("./parsers/csv-to-json");
Object.defineProperty(exports, "csvToJson", { enumerable: true, get: function () { return tslib_1.__importDefault(csv_to_json_1).default; } });
// Configs
var dot_env_config_1 = require("./configs/dot-env-config");
Object.defineProperty(exports, "DotEnvConfig", { enumerable: true, get: function () { return tslib_1.__importDefault(dot_env_config_1).default; } });
var tapjaw_message_config_1 = require("./configs/tapjaw-message-config");
Object.defineProperty(exports, "TapjawMessageConfig", { enumerable: true, get: function () { return tslib_1.__importDefault(tapjaw_message_config_1).default; } });
