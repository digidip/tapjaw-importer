"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const is_error_1 = (0, tslib_1.__importDefault)(require("../typeguards/is-error"));
class TapjawAdapterError extends Error {
    constructor(message, adapter) {
        if (typeof message === 'string') {
            super(message);
            this.name = `TapjawAdapterError:${adapter.constructor.name}`;
        }
        else if ((0, is_error_1.default)(message)) {
            super(String(message));
            this.name = `TapjawAdapterError:${adapter.constructor.name}`;
            this.parentStack = message.stack;
        }
        else {
            throw new Error('Unsupported message data type passed to TapjawAdapterError');
        }
    }
}
exports.default = TapjawAdapterError;
