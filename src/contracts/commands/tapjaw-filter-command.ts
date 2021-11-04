import TapjawMessage from '../tapjaw-message';
import BaseTapjawCommand, {
    TapjawCommandArgs,
    TapjawCommandDefaultFlags,
    TapjawCommandFlags,
} from './base-tapjaw-command';
import split2 from 'split2';
import through from 'through';
import { Command } from 'commander';
import TapjawLogger from '../tapjaw-logger';
import ConsoleLogger from '../../support/console-logger';
import jsonMessageParser from '../../parsers/json-message-parser';

export default abstract class TapjawFilterCommand<T extends TapjawCommandFlags, M extends TapjawMessage>
    implements BaseTapjawCommand
{
    public constructor(
        protected readonly stdin: NodeJS.ReadableStream,
        protected readonly stdout: NodeJS.WritableStream,
        protected readonly displayJsonParseErrors = false
    ) {}

    /**
     * Run the command the execute the iterator run routine.
     *
     */
    public async run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void> {
        process.on('beforeExit', () => {
            this.onBeforeExit().catch((error: Error) => TapjawFilterCommand.getLogger().error(error));
        });

        this.stdin.pipe(split2()).pipe(
            through((line: string): void => {
                const message = jsonMessageParser<M>(
                    line,
                    this.displayJsonParseErrors,
                    TapjawFilterCommand.getLogger()
                );

                if (message instanceof TapjawMessage) {
                    this.onMessageFilter(message, args, flags)
                        .then(this.emit.bind(this))
                        .catch(TapjawFilterCommand.getLogger().error);
                }
            })
        );

        return Promise.resolve();
    }

    protected emit(message: M): void {
        this.stdout.write(JSON.stringify(message) + '\n');
    }

    protected abstract onMessageFilter(
        message: M,
        args: TapjawCommandArgs,
        flags: T & TapjawCommandDefaultFlags
    ): Promise<M>;

    protected onBeforeExit(): Promise<void> {
        return Promise.resolve();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static register(program: Command): void {
        throw new Error('static register() method not overloaded.');
    }

    protected static getLogger(): TapjawLogger {
        return new ConsoleLogger();
    }
}
