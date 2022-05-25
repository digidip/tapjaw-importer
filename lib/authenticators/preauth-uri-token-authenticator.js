"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_authenticator_1 = require("../contracts/tapjaw-authenticator");
const request_1 = (0, tslib_1.__importDefault)(require("./support/request"));
const jsonpath_1 = (0, tslib_1.__importDefault)(require("jsonpath"));
class PreauthUriTokenAuthenticator {
    constructor(hostname, path, method = "GET", tokenJsonPath, params = {}, headers = {}) {
        this.hostname = hostname;
        this.path = path;
        this.method = method;
        this.tokenJsonPath = tokenJsonPath;
        this.params = params;
        this.headers = headers;
    }
    isAuthenticated() {
        return Boolean(this.token);
    }
    async authenticate() {
        const headers = {
            ...this.headers
        };
        const params = new URLSearchParams({
            ...this.params
        }).toString();
        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers
        };
        if (this.method === "GET") {
            options.path = `${options.path}?${params}`;
        }
        const response = await (0, request_1.default)(this.method === "POST" ? params : "", options);
        if (!response) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError("No token response was recieved.");
        }
        const json = JSON.parse(response);
        const data = jsonpath_1.default.query(json, this.tokenJsonPath);
        if (data.length !== 1) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`Could not extract token with JSONPath (${this.tokenJsonPath}) from response: ${response}`);
        }
        this.token = data[0];
        return this.token;
    }
}
exports.default = PreauthUriTokenAuthenticator;
