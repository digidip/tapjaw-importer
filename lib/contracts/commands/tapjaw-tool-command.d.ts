import BaseTapjawCommand, { TapjawCommandArgs, TapjawCommandDefaultFlags, TapjawCommandFlags } from './base-tapjaw-command';
import { Command } from 'commander';
import TapjawLogger from '../tapjaw-logger';
export default abstract class TapjawToolCommand<T extends TapjawCommandFlags> implements BaseTapjawCommand {
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    abstract run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
