"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const split2_1 = (0, tslib_1.__importDefault)(require("split2"));
const through_1 = (0, tslib_1.__importDefault)(require("through"));
const console_logger_1 = (0, tslib_1.__importDefault)(require("../../support/console-logger"));
const json_message_parser_1 = (0, tslib_1.__importDefault)(require("../../parsers/json-message-parser"));
const __1 = require("../..");
const command_register_1 = (0, tslib_1.__importDefault)(require("../../reflection/command-register"));
class TapjawFilterCommand {
    constructor(stdin, stdout, displayJsonParseErrors = false) {
        this.stdin = stdin;
        this.stdout = stdout;
        this.displayJsonParseErrors = displayJsonParseErrors;
    }
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    async run(args, flags) {
        return new Promise((resolve, reject) => {
            process.on('beforeExit', () => {
                this.onBeforeExit().catch((error) => TapjawFilterCommand.getLogger().error(error));
            });
            this.stdin
                .pipe((0, split2_1.default)())
                .pipe((0, through_1.default)((line) => {
                const message = (0, json_message_parser_1.default)(line, this.displayJsonParseErrors, TapjawFilterCommand.getLogger());
                if ((0, __1.isTapjawMessage)(message)) {
                    this.onMessageFilter(message, args, flags)
                        .then((msg) => {
                        if (msg !== null) {
                            this.emit(message);
                        }
                    })
                        .catch(TapjawFilterCommand.getLogger().error);
                }
            }))
                .on('end', resolve)
                .on('error', reject);
        });
    }
    emit(message) {
        this.stdout.write(JSON.stringify(message) + '\n');
    }
    onBeforeExit() {
        return Promise.resolve();
    }
    static register(program) {
        command_register_1.default.call(this, program);
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawFilterCommand;
