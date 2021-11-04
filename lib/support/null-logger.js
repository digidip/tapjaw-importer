"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NullLogger {
    error(message) {
        return this;
    }
    warn(message) {
        return this;
    }
    info(message) {
        return this;
    }
    debug(message) {
        return this;
    }
    verbose(message) {
        return this;
    }
    silly(message) {
        return this;
    }
    log(level, message) {
        return this;
    }
}
exports.default = NullLogger;
