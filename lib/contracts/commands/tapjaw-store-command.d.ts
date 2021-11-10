/// <reference types="node" />
import TapjawMessage from '../../messages/tapjaw-message';
import BaseTapjawCommand, { TapjawCommandArgs, TapjawCommandDefaultFlags, TapjawCommandFlags } from './base-tapjaw-command';
import { Command } from 'commander';
import TapjawLogger from '../tapjaw-logger';
export default abstract class TapjawStoreCommand<T extends TapjawCommandFlags, M extends TapjawMessage> implements BaseTapjawCommand {
    protected readonly stdin: NodeJS.ReadableStream;
    protected readonly displayJsonParseErrors: boolean;
    constructor(stdin: NodeJS.ReadableStream, displayJsonParseErrors?: boolean);
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;
    protected abstract onStoreMessage(message: M, args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;
    protected onBeforeExit(): Promise<void>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
