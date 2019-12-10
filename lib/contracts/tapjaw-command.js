"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const stdout_iterator_1 = tslib_1.__importDefault(require("../iterators/stdout-iterator"));
class TapjawCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        /**
         * The iterator implementation, by default the STDOUT iterator is set.
         *
         * @see TapjawIterator
         */
        this.iterator = new stdout_iterator_1.default(process.stdout);
    }
    /**
     * Run the command the execute the iterator run routine.
     *
     * @see @oclif/command
     */
    async run() {
        const { args, flags } = this.parse(this.instance);
        await this.iterator.run(this.getAdapterCallback(args, flags), flags.limit && Number.isInteger(flags.limit)
            ? flags.limit
            : undefined);
    }
}
exports.default = TapjawCommand;
/**
 * The command arguments
 *
 * @see @oclif/command
 */
TapjawCommand.args = [];
/**
 * Default Flags, please use `...TapjawCommand.defaultFlags` in your own `flags` property.
 *
 * Example:
 * ```typescript
 *     class MyCommand extends TapjawCommand {
 *         static flags = {
 *             ...TapjawCommand.defaultFlags,
 *         }
 *     }
 * ```
 *
 * @see @oclif/command
 */
TapjawCommand.defaultFlags = {
    help: command_1.flags.help({ char: 'h' }),
    limit: command_1.flags.integer({
        char: 'l',
        description: 'Limit the number of outputted JSON messages'
    })
};
