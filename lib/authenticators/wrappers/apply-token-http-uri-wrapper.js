"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
class ApplyTokenHttpUriWrapper {
    constructor(uriParameterName, authenticator) {
        this.uriParameterName = uriParameterName;
        this.authenticator = authenticator;
    }
    async authenticate(requestOptionContainer) {
        if (this.authenticator.isAuthenticated()) {
            // Apply Authorization header.
            return this.applyTokenToURI(requestOptionContainer);
        }
        // Generate the Authorization token.
        this.token = await this.authenticator.authenticate();
        if (typeof this.token !== 'string') {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No Authorization token recieved from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`);
        }
        return this.applyTokenToURI(requestOptionContainer);
    }
    applyTokenToURI(options) {
        if (!options.path) {
            throw new tapjaw_authenticator_1.TapjawAuthenticatorError(`No path available in RequestOptions: ${this.authenticator.constructor.name || 'Unknown'}`);
        }
        const path = new URL(`https://www.digidip.com/${options.path}`);
        path.searchParams.set(this.uriParameterName, this.token);
        options.path = `${path.pathname}?${path.searchParams.toString()}`;
        return options;
    }
}
exports.default = ApplyTokenHttpUriWrapper;
