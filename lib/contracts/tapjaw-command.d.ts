import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import { TapjawAdapterCallback } from './tapjaw-adapter';
import { OutputArgs, OutputFlags } from '@oclif/parser';
import { ParserInput } from '@oclif/parser/lib/parse';
export declare type TapjawCommandArgs = OutputArgs<ParserInput['args']>;
export declare type TapjawCommandFlags = OutputFlags<ParserInput['flags']>;
export default abstract class TapjawCommand extends Command {
    /**
     * The command arguments
     *
     * @see @oclif/command
     */
    static args: never[];
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
    static defaultFlags: flags.Input<any>;
    /**
     * The class which extends this abstract class.
     *
     * This is required so oclif can determine which Arguments and Flags exist against the command
     * implementation.
     *
     * Example:
     * ```typescript
     *     class MyCommand extends TapjawCommand {
     *        instance = MyCommand;
     *        // ...
     *     }
     * ```
     */
    abstract instance: any;
    /**
     * The iterator implementation, by default the STDOUT iterator is set.
     *
     * @see TapjawIterator
     */
    protected iterator: TapjawIterator;
    /**
     * Run the command the execute the iterator run routine.
     *
     * @see @oclif/command
     */
    run(): Promise<void>;
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
    protected abstract getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback;
}
