/// <reference types="node" />
import TapjawMessage from '../messages/tapjaw-message';
import TapjawCommand, { TapjawCommandArgs, TapjawCommandFlags } from '../contracts/tapjaw-command';
import { Command } from 'commander';
import TapjawLogger from '../contracts/tapjaw-logger';
export default abstract class TapjawStoreCommand<T extends TapjawCommandFlags, M extends TapjawMessage> implements TapjawCommand {
    protected readonly stdin: NodeJS.ReadableStream;
    protected readonly displayJsonParseErrors: boolean;
    constructor(stdin: NodeJS.ReadableStream, displayJsonParseErrors?: boolean);
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    run(args: TapjawCommandArgs, flags: T): Promise<void>;
    protected abstract onStoreMessage(message: M, args: TapjawCommandArgs, flags: T): Promise<void>;
    protected onBeforeExit(args: TapjawCommandArgs, flags: T): Promise<void>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
