"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const luxon_1 = require("luxon");
const constants_1 = require("../../date/constants");
class JWTTokenGenerator {
    constructor(algorithm = 'HS256') {
        this.algorithm = algorithm;
    }
    async getToken() {
        return (0, jsonwebtoken_1.sign)({
            // sub: authenticator.userUid,
            ...(await this.getPayloadMetadata()),
            iat: Number(luxon_1.DateTime.now().toFormat(constants_1.UNIX_TIMESTAMP)),
        }, await this.getSecretKey(), {
            algorithm: this.algorithm,
            header: {
                alg: this.algorithm,
            },
        });
    }
}
exports.default = JWTTokenGenerator;
