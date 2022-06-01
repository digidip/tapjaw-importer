"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const split2_1 = (0, tslib_1.__importDefault)(require("split2"));
const through_1 = (0, tslib_1.__importDefault)(require("through"));
const console_logger_1 = (0, tslib_1.__importDefault)(require("../support/console-logger"));
const json_message_parser_1 = (0, tslib_1.__importDefault)(require("../parsers/json-message-parser"));
const typeguards_1 = require("../typeguards");
const command_register_1 = (0, tslib_1.__importDefault)(require("../reflection/command-register"));
class TapjawStoreCommand {
    constructor(stdin, displayJsonParseErrors = false) {
        this.stdin = stdin;
        this.displayJsonParseErrors = displayJsonParseErrors;
    }
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    async run(args, flags) {
        const instance = this.constructor;
        return new Promise((resolve, reject) => {
            process.on('beforeExit', () => {
                this.onBeforeExit(args, flags).catch((error) => instance.getLogger().error(error));
            });
            this.stdin
                .pipe((0, split2_1.default)())
                .pipe((0, through_1.default)((line) => {
                const message = (0, json_message_parser_1.default)(line, this.displayJsonParseErrors, instance.getLogger());
                if ((0, typeguards_1.isTapjawMessage)(message)) {
                    this.onStoreMessage(message, args, flags).catch(instance.getLogger().error);
                }
            }))
                .on('end', resolve)
                .on('error', reject);
        });
    }
    onBeforeExit(args, flags) {
        return Promise.resolve();
    }
    static register(program) {
        command_register_1.default.call(this, program);
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawStoreCommand;
