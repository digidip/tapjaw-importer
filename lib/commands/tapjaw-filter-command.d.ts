/// <reference types="node" />
import TapjawMessage from '../messages/tapjaw-message';
import TapjawCommand, { TapjawCommandArgs, TapjawCommandFlags } from '../contracts/tapjaw-command';
import { Command } from 'commander';
import TapjawLogger from '../contracts/tapjaw-logger';
export default abstract class TapjawFilterCommand<T extends TapjawCommandFlags, M extends TapjawMessage> implements TapjawCommand {
    protected readonly stdin: NodeJS.ReadableStream;
    protected readonly stdout: NodeJS.WritableStream;
    protected readonly displayJsonParseErrors: boolean;
    constructor(stdin: NodeJS.ReadableStream, stdout: NodeJS.WritableStream, displayJsonParseErrors?: boolean);
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    run(args: TapjawCommandArgs, flags: T): Promise<void>;
    protected emit(message: M): void;
    protected abstract onMessageFilter(message: M, args: TapjawCommandArgs, flags: T): Promise<M | null>;
    protected onBeforeExit(args: TapjawCommandArgs, flags: T): Promise<void>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
