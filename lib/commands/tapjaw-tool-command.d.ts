import TapjawCommand, { TapjawCommandArgs, TapjawCommandDefaultFlags, TapjawCommandFlags } from '../contracts/tapjaw-command';
import { Command } from 'commander';
import TapjawLogger from '../contracts/tapjaw-logger';
export default abstract class TapjawToolCommand<T extends TapjawCommandFlags> implements TapjawCommand {
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    abstract run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;
    static register(program: Command): void;
    protected static getLogger(): TapjawLogger;
}
