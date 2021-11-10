"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stdout_iterator_1 = (0, tslib_1.__importDefault)(require("../../iterators/stdout-iterator"));
const console_logger_1 = (0, tslib_1.__importDefault)(require("../../support/console-logger"));
const command_register_1 = (0, tslib_1.__importDefault)(require("../../reflection/command-register"));
/**
 * @module TapjawCommand
 *
 * Default TapjawApiCommand, used in conjunction with a {@link TapjawAdapter} to quickly iterate over
 * messages and output to a {@link TapjawIterator}.
 *
 * Example:
 * ```typescript
 * @TapjawMetadata.Command.Name('my-command')
 * @TapjawMetadata.Command.Description('my-command desc')
 * @TapjawMetadata.Command.Action(async (options: MyCommandOptions) => {
 *     try {
 *         await new MyCommand(new MyAdapter(new MyConnector(...))).run({}, options);
 *     } catch (error) {
 *         MyCommand.getLogger().error(String(error));
 *     }
 * })
 * class MyCommand extends TapjawApiCommand {
 *     protected async getAdapterCallback(
 *         args: TapjawCommandArgs,
 *         flags: TapjawCommandFlags
 *     ): TapjawAdapterCallback<TapjawMessage> {
 *         const implementedAdapter = this.adapter;
 *
 *         // Return a callback to emit messages to a TapjawIterator.
 *         return (async function* (): AsyncGenerator<TapjawMessage> {
 *             yield* implementedAdapter.myMethodToExecute(flags.onlyActiveItems, category);
 *         });
 *     }
 * }
 * ```
 */
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
    static register(program) {
        command_register_1.default
            .call(this, program)
            .requiredOption('-i, --import-id <importId>', 'The unique Import ID');
    }
    static getLogger() {
        return new console_logger_1.default();
    }
}
exports.default = TapjawApiCommand;
