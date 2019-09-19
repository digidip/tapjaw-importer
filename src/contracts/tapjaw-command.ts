import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import { TapjawAdapterCallback } from './tapjaw-adapter';
import { OutputFlags } from '@oclif/parser';
import { ParserInput } from '@oclif/parser/lib/parse';
import StdoutIterator from '../iterators/stdout-iterator';
import { IArg } from '@oclif/parser/lib/args';

export type TapjawCommandArgs = { [key: string]: any }; //OutputArgs<ParserInput['args']>;
export type TapjawCommandFlags = OutputFlags<ParserInput['flags']>;

export default abstract class TapjawCommand extends Command {
    /**
     * The command arguments
     *
     * @see @oclif/command
     */
    static args: IArg[] = [];

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
    static defaultFlags: flags.Input<any> = {
        help: flags.help({ char: 'h' }),
        limit: flags.integer({ char: 'l', description: 'Limit the number of outputted JSON messages' }),
    };

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
    abstract instance: any; // @todo see if we can honour Parser.Input

    /**
     * The iterator implementation, by default the STDOUT iterator is set.
     *
     * @see TapjawIterator
     */
    protected iterator: TapjawIterator = new StdoutIterator(process.stdout);

    /**
     * Run the command the execute the iterator run routine.
     *
     * @see @oclif/command
     */
    async run() {
        const { args, flags } = this.parse(this.instance);

        await this.iterator.run(
            this.getAdapterCallback(args, flags),
            flags.limit && Number.isInteger(flags.limit) ? flags.limit : undefined
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
    protected abstract getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback;
}
