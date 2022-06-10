"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
class ApplyQueryStringWrapper {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    async authenticate(requestOptionContainer) {
        return Promise.resolve(this.applyAuthParametersToPath(requestOptionContainer));
    }
    async applyAuthParametersToPath(options) {
        if (!options.path) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No path available in RequestOptions: ${this.authenticator.constructor.name || 'Unknown'}`);
        }
        const path = new URL(`https://www.digidip.com${options.path}`);
        const queryParameters = await this.authenticator.authenticate();
        for (const [name, value] of Object.entries(queryParameters)) {
            path.searchParams.set(name, value);
        }
        options.path = `${path.pathname}?${path.searchParams.toString()}`;
        return options;
    }
}
exports.default = ApplyQueryStringWrapper;
