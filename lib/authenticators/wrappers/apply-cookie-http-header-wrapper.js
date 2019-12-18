"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tough_cookie_1 = require("tough-cookie");
class ApplyCookieHttpHeaderWrapper {
    constructor(authenticator, host) {
        this.authenticator = authenticator;
        this.host = host;
        this.cookies = new tough_cookie_1.CookieJar();
    }
    authenticate(requestOptionContainer) {
        return new Promise(async (resolve, reject) => {
            if (!this.authenticator.isAuthenticated()) {
                try {
                    this.cookies = (await this.authenticator.authenticate()).cookies;
                }
                catch (error) {
                    return reject(error);
                }
            }
            resolve(this.applyCookiesToHeader(requestOptionContainer));
        });
    }
    applyCookiesToHeader(options) {
        return Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), { Cookie: this.cookies.getCookieStringSync(this.host) }) });
    }
}
exports.default = ApplyCookieHttpHeaderWrapper;
