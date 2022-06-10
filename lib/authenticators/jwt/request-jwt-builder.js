"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_builder_1 = tslib_1.__importDefault(require("./jwt-builder"));
class RequestJWTBuilder extends jwt_builder_1.default {
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
exports.default = RequestJWTBuilder;
