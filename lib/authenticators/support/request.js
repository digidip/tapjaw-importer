"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const https = tslib_1.__importStar(require("https"));
/**
 * Wraps and performs a HTTP/HTTPS request.
 *
 * @todo Move into global support to make it more reusable and abstract away the HTTP/HTTPS node library from existing code.
 *
 * @param params string
 * @param options https.RequestOptions
 * @param responseEncoding string
 * @reutrn Promise<T>
 */
const request = (params, options, responseEncoding = "utf8") => {
    return new Promise((resolve, reject) => {
        const authReq = https.request(options, (response) => {
            if (response.statusCode !== 200) {
                const error = new Error(`HTTP Status code was ${response.statusCode}.`);
                return reject(error);
            }
            let buffer = "";
            response.setEncoding(responseEncoding);
            response.on("data", (data) => (buffer += data));
            response.on("end", () => resolve(buffer));
            response.on("error", (error) => reject(error));
        });
        authReq.write(params);
        authReq.end();
    });
};
exports.default = request;
