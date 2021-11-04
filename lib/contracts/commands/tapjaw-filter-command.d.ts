/// <reference types="node" />
import TapjawMessage from '../tapjaw-message';
import BaseTapjawCommand, { TapjawCommandArgs, TapjawCommandDefaultFlags, TapjawCommandFlags } from './base-tapjaw-command';
import { Command } from 'commander';
import TapjawLogger from '../tapjaw-logger';
export default abstract class TapjawFilterCommand<T extends TapjawCommandFlags, M extends TapjawMessage> implements BaseTapjawCommand {
    protected readonly stdin: NodeJS.ReadableStream;
    protected readonly stdout: NodeJS.WritableStream;
    protected readonly displayJsonParseErrors: boolean;
    constructor(stdin: NodeJS.ReadableStream, stdout: NodeJS.WritableStream, displayJsonParseErrors?: boolean);
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;
    protected emit(message: M): void;
    protected abstract onMessageFilter(message: M, args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<M>;
    protected onBeforeExit(): Promise<void>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
