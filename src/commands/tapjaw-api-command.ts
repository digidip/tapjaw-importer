import TapjawIterator from '../contracts/tapjaw-iterator';
import { TapjawAdapterCallback } from '../contracts/tapjaw-adapter';
import StdoutIterator from '../iterators/stdout-iterator';
import TapjawMessage from '../messages/tapjaw-message';
import { Command } from 'commander';
import BaseTapjawCommand, {
    TapjawCommandArgs,
    TapjawCommandDefaultFlags,
    TapjawCommandFlags,
} from '../contracts/base-tapjaw-command';
import ConsoleLogger from '../support/console-logger';
import TapjawLogger from '../contracts/tapjaw-logger';
import commandRegister from '../reflection/command-register';

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
export default abstract class TapjawApiCommand implements BaseTapjawCommand {
    protected iterator: TapjawIterator;

    public constructor(iterator?: TapjawIterator) {
        this.iterator = iterator ? iterator : new StdoutIterator(process.stdout);
    }

    /**
     * Run the command the execute the iterator run routine.
     *
     */
    async run<T extends TapjawCommandFlags>(
        args: TapjawCommandArgs,
        flags: T & TapjawCommandDefaultFlags
    ): Promise<void> {
        await this.iterator.run(this.getAdapterCallback(args, flags), flags.limit ? Number(flags.limit) : undefined);
    }

    /**
     * Implement this function to return a callback that provides the implementation
     * on how to call an adapters method. This allows for arguments and flags from this method to adjust
     * the behaviour from the Adapter's method.
     *
     * Basic Example:
     * ```typescript
     *   getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback {
     *      return (async function* (): AsyncGenerator<TapjawMessage> {
     *          yield* implementedAdapter.myMethodToExecute();
     *      });
     *   }
     * ```
     *
     * Broader Example:
     * ```typescript
     *   getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback {
     *      const category = args.category || undefined;
     *
     *      return (async function* (): AsyncGenerator<TapjawMessage> {
     *          yield* implementedAdapter.myMethodToExecute(flags.onlyActiveItems, category);
     *      });
     *   }
     * ```
     *
     * @param args TapjawCommandArgs
     * @param flags TapjawCommandFlags
     * @return TapjawAdapterCallback
     * @see TapjawAdapter
     */
    protected abstract getAdapterCallback(
        args: TapjawCommandArgs,
        flags: TapjawCommandFlags
    ): TapjawAdapterCallback<TapjawMessage>;

    public static register(program: Command): void {
        commandRegister
            .call(this as unknown as BaseTapjawCommand, program)
            .requiredOption('-i, --import-id <importId>', 'The unique Import ID');
    }

    protected static getLogger(): TapjawLogger {
        return new ConsoleLogger();
    }
}
