"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt_builder_1 = tslib_1.__importDefault(require("./jwt-builder"));
class ManualJWTBuilder extends jwt_builder_1.default {
    constructor(secret, payload, algorithm = 'HS256') {
        super(algorithm);
        this.secret = secret;
        this.payload = payload;
        this.algorithm = algorithm;
    }
    async getPayloadMetadata() {
        return Promise.resolve(this.payload);
    }
    async getSecretKey() {
        return Promise.resolve(this.secret);
    }
}
exports.default = ManualJWTBuilder;
