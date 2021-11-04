import BaseTapjawCommand, {
    TapjawCommandArgs,
    TapjawCommandDefaultFlags,
    TapjawCommandFlags,
} from './base-tapjaw-command';
import { Command } from 'commander';
import ConsoleLogger from '../../support/console-logger';
import TapjawLogger from '../tapjaw-logger';

export default abstract class TapjawToolCommand<T extends TapjawCommandFlags> implements BaseTapjawCommand {
    /**
     * Run the command the execute the iterator run routine.
     *
     */
    public abstract run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void>;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static register(program: Command): void {
        throw new Error('static register() method not overloaded.');
    }

    protected static getLogger(): TapjawLogger {
        return new ConsoleLogger();
    }
}
