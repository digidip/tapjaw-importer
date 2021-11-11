"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    error(message) {
        console.error(message);
        return this;
    }
    warn(message) {
        console.warn(String(message));
        return this;
    }
    info(message) {
        console.info(String(message));
        return this;
    }
    debug(message) {
        console.debug(String(message));
        return this;
    }
    verbose(message) {
        console.log(String(message));
        return this;
    }
    silly(message) {
        console.log(String(message));
        return this;
    }
    log(level, message) {
        console.log(level, String(message));
        return this;
    }
}
exports.default = ConsoleLogger;
