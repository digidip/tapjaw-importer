"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJwtHttpHeaderWrapper = exports.ApplyOauthAuthorizationHttpHeaderWrapper = exports.applyAuthorizationHttpHeaderWrapper = void 0;
var apply_authorization_http_header_wrapper_1 = require("./apply-authorization-http-header-wrapper");
Object.defineProperty(exports, "applyAuthorizationHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_authorization_http_header_wrapper_1).default; } });
var apply_oauth_authorization_http_header_wrapper_1 = require("./apply-oauth-authorization-http-header-wrapper");
Object.defineProperty(exports, "ApplyOauthAuthorizationHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_oauth_authorization_http_header_wrapper_1).default; } });
var apply_jwt_http_header_wrapper_1 = require("./apply-jwt-http-header-wrapper");
Object.defineProperty(exports, "ApplyJwtHttpHeaderWrapper", { enumerable: true, get: function () { return __importDefault(apply_jwt_http_header_wrapper_1).default; } });
