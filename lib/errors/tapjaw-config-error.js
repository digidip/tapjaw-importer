"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TapjawConfigError extends Error {
    constructor(message) {
        super(message);
        this.message = `\n ConfigError occured\n======================================================\n${this.message}`;
        this.name = 'TapjawConfigError';
    }
}
exports.default = TapjawConfigError;
