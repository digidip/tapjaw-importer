import TapjawCommand, {
    TapjawCommandArgs,
    TapjawCommandDefaultFlags,
    TapjawCommandFlags,
} from '../contracts/tapjaw-command';
import { Command } from 'commander';
import ConsoleLogger from '../support/console-logger';
import TapjawLogger from '../contracts/tapjaw-logger';
import commandRegister from '../reflection/command-register';

export default abstract class TapjawToolCommand<T extends TapjawCommandFlags> implements TapjawCommand {
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    public abstract run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;

    public static register(program: Command): void {
        commandRegister.call(this as unknown as TapjawCommand, program);
    }

    protected static getLogger(): TapjawLogger {
        return new ConsoleLogger();
    }
}
