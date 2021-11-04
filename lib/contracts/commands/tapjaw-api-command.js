"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stdout_iterator_1 = (0, tslib_1.__importDefault)(require("../../iterators/stdout-iterator"));
const console_logger_1 = (0, tslib_1.__importDefault)(require("../../support/console-logger"));
class TapjawApiCommand {
    constructor(iterator) {
        this.iterator = iterator ? iterator : new stdout_iterator_1.default(process.stdout);
    }
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    async run(args, flags) {
        await this.iterator.run(this.getAdapterCallback(args, flags), flags.limit ? Number(flags.limit) : undefined);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static register(program) {
        throw new Error('static register() method not overloaded.');
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawApiCommand;
