"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stdout_iterator_1 = tslib_1.__importDefault(require("../iterators/stdout-iterator"));
class TapjawCommand {
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
}
exports.default = TapjawCommand;
