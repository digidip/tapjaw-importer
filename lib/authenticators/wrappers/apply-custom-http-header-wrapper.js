"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplyCustomHttpHeaderWrapper {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    async authenticate(requestOptionContainer) {
        this.headers = await this.authenticator.authenticate();
        return this.applyCustomHeader(requestOptionContainer);
    }
    applyCustomHeader(options) {
        options.headers = { ...options.headers, ...this.headers };
        return options;
    }
}
exports.default = ApplyCustomHttpHeaderWrapper;
