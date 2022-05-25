"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyTokenHttpUriWrapper = exports.ApplyOAuthRefreshHttpHeaderWrapper = exports.ApplyCustomHttpHeaderWrapper = exports.ApplyJwtHttpHeaderWrapper = exports.ApplyOauthAuthorizationHttpHeaderWrapper = exports.applyAuthorizationHttpHeaderWrapper = void 0;
var apply_authorization_http_header_wrapper_1 = require("./apply-authorization-http-header-wrapper");
Object.defineProperty(exports, "applyAuthorizationHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_authorization_http_header_wrapper_1).default; } });
var apply_oauth_authorization_http_header_wrapper_1 = require("./apply-oauth-authorization-http-header-wrapper");
Object.defineProperty(exports, "ApplyOauthAuthorizationHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_oauth_authorization_http_header_wrapper_1).default; } });
var apply_jwt_http_header_wrapper_1 = require("./apply-jwt-http-header-wrapper");
Object.defineProperty(exports, "ApplyJwtHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_jwt_http_header_wrapper_1).default; } });
// Additional wrappers
var apply_custom_http_header_wrapper_1 = require("./apply-custom-http-header-wrapper");
Object.defineProperty(exports, "ApplyCustomHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_custom_http_header_wrapper_1).default; } });
var apply_oauth_refresh_http_header_wrapper_1 = require("./apply-oauth-refresh-http-header-wrapper");
Object.defineProperty(exports, "ApplyOAuthRefreshHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_oauth_refresh_http_header_wrapper_1).default; } });
var apply_token_http_uri_wrapper_1 = require("./apply-token-http-uri-wrapper");
Object.defineProperty(exports, "ApplyTokenHttpUriWrapper", { enumerable: true, get: function () { return __importDefault(apply_token_http_uri_wrapper_1).default; } });
