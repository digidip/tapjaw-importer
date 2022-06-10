"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const is_error_1 = tslib_1.__importDefault(require("../typeguards/is-error"));
class TapjawConnectorError extends Error {
    constructor(message, connector) {
        if (typeof message === 'string') {
            super(`${connector.constructor.name}: ${message}`);
            this.name = `TapjawConnectorError:${connector.constructor.name}`;
        }
        else if ((0, is_error_1.default)(message)) {
            super(`${connector.constructor.name}: ${String(message)}`);
            this.name = `TapjawConnectorError:${connector.constructor.name}`;
            this.parentStack = message.stack;
        }
        else {
            throw new Error('Unsupported message data type passed to TapjawConnectorError');
        }
    }
}
exports.default = TapjawConnectorError;
