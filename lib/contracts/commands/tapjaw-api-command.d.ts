import TapjawIterator from '../tapjaw-iterator';
import { TapjawAdapterCallback } from '../tapjaw-adapter';
import TapjawMessage from '../tapjaw-message';
import { Command } from 'commander';
import BaseTapjawCommand, { TapjawCommandArgs, TapjawCommandDefaultFlags, TapjawCommandFlags } from './base-tapjaw-command';
import TapjawLogger from '../tapjaw-logger';
export default abstract class TapjawApiCommand implements BaseTapjawCommand {
    protected iterator: TapjawIterator;
    constructor(iterator?: TapjawIterator);
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    run<T extends TapjawCommandFlags>(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;
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
    protected abstract getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback<TapjawMessage>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
