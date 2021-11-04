"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const console_logger_1 = (0, tslib_1.__importDefault)(require("../../support/console-logger"));
class TapjawToolCommand {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static register(program) {
        throw new Error('static register() method not overloaded.');
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawToolCommand;
