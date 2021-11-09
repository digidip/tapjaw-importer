"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_token_generator_1 = (0, tslib_1.__importDefault)(require("./jwt-token-generator"));
class RequestJWTTokenGenerator extends jwt_token_generator_1.default {
    constructor(algorithm = 'HS256') {
        super(algorithm);
        this.algorithm = algorithm;
    }
    async getPayloadMetadata() {
        if (!this.requestResponse) {
            this.requestResponse = await this.getRequestResponse();
        }
        return Promise.resolve(this.requestResponse.payload);
    }
    async getSecretKey() {
        if (!this.requestResponse) {
            this.requestResponse = await this.getRequestResponse();
        }
        return Promise.resolve(this.requestResponse.secret);
    }
}
exports.default = RequestJWTTokenGenerator;
