import TapjawIterator from './tapjaw-iterator';
import { TapjawAdapterCallback } from './tapjaw-adapter';
import StdoutIterator from '../iterators/stdout-iterator';
import TapjawMessage from './tapjaw-message';

export type TapjawCommandArgs = { [key: string]: any };
export type TapjawCommandFlags = { [key: string]: any };

export interface TapjawCommandDefaultFlags {
    limit: string;
}

export default abstract class TapjawCommand {
    protected iterator: TapjawIterator;

    public constructor(iterator?: TapjawIterator) {
        this.iterator = iterator ? iterator : new StdoutIterator(process.stdout);
    }

    /**
     * Run the command the execute the iterator run routine.
     *
     */
    async run<T extends TapjawCommandFlags>(args: any[], flags: T & TapjawCommandDefaultFlags) {
        await this.iterator.run(
            this.getAdapterCallback(args, flags),
            flags.limit ? Number(flags.limit) : undefined
        );
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
}
