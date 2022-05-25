"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apply_oauth_authorization_http_header_wrapper_1 = (0, tslib_1.__importDefault)(require("./apply-oauth-authorization-http-header-wrapper"));
class ApplyOAuthRefreshHttpHeaderWrapper extends apply_oauth_authorization_http_header_wrapper_1.default {
    constructor(refreshAthenticator) {
        super(refreshAthenticator);
        this.refreshAthenticator = refreshAthenticator;
    }
    async refreshToken() {
        const oauthResponse = await this.refreshAthenticator.refreshToken();
        if (this.authenticationData) {
            this.authenticationData.access_token = oauthResponse.access_token;
        }
    }
}
exports.default = ApplyOAuthRefreshHttpHeaderWrapper;
