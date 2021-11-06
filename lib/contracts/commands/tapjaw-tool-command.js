"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const console_logger_1 = (0, tslib_1.__importDefault)(require("../../support/console-logger"));
const command_register_1 = (0, tslib_1.__importDefault)(require("../../reflection/command-register"));
class TapjawToolCommand {
    static register(program) {
        command_register_1.default.call(this, program);
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawToolCommand;
