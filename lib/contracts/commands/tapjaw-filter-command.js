"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_message_1 = (0, tslib_1.__importDefault)(require("../tapjaw-message"));
const split2_1 = (0, tslib_1.__importDefault)(require("split2"));
const through_1 = (0, tslib_1.__importDefault)(require("through"));
const console_logger_1 = (0, tslib_1.__importDefault)(require("../../support/console-logger"));
const json_message_parser_1 = (0, tslib_1.__importDefault)(require("../../parsers/json-message-parser"));
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
        process.on('beforeExit', () => {
            this.onBeforeExit().catch((error) => TapjawFilterCommand.getLogger().error(error));
        });
        this.stdin.pipe((0, split2_1.default)()).pipe((0, through_1.default)((line) => {
            const message = (0, json_message_parser_1.default)(line, this.displayJsonParseErrors, TapjawFilterCommand.getLogger());
            if (message instanceof tapjaw_message_1.default) {
                this.onMessageFilter(message, args, flags)
                    .then(this.emit.bind(this))
                    .catch(TapjawFilterCommand.getLogger().error);
            }
        }));
        return Promise.resolve();
    }
    emit(message) {
        this.stdout.write(JSON.stringify(message) + '\n');
    }
    onBeforeExit() {
        return Promise.resolve();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static register(program) {
        throw new Error('static register() method not overloaded.');
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawFilterCommand;
