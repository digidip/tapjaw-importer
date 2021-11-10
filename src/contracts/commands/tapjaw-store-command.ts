import TapjawMessage from '../../messages/tapjaw-message';
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
import { isTapjawMessage } from '../../typeguards';
import commandRegister from '../../reflection/command-register';

export default abstract class TapjawStoreCommand<T extends TapjawCommandFlags, M extends TapjawMessage>
    implements BaseTapjawCommand
{
    public constructor(
        protected readonly stdin: NodeJS.ReadableStream,
        protected readonly displayJsonParseErrors = false
    ) {}

    /**
     * Run the command the execute the iterator run routine.
     *
     */
    public async run(args: TapjawCommandArgs, flags: T & TapjawCommandDefaultFlags): Promise<void> {
        return new Promise((resolve, reject) => {
            process.on('beforeExit', () => {
                this.onBeforeExit().catch((error: Error) => TapjawStoreCommand.getLogger().error(error));
            });

            this.stdin
                .pipe(split2())
                .pipe(
                    through((line: string): void => {
                        const message = jsonMessageParser<M>(
                            line,
                            this.displayJsonParseErrors,
                            TapjawStoreCommand.getLogger()
                        );

                        if (isTapjawMessage(message)) {
                            this.onStoreMessage(message, args, flags).catch(TapjawStoreCommand.getLogger().error);
                        }
                    })
                )
                .on('end', resolve)
                .on('error', reject);
        });
    }

    protected abstract onStoreMessage(
        message: M,
        args: TapjawCommandArgs,
        flags: T & TapjawCommandDefaultFlags
    ): Promise<void>;

    protected onBeforeExit(): Promise<void> {
        return Promise.resolve();
    }

    public static register(program: Command): void {
        commandRegister.call(this as unknown as BaseTapjawCommand, program);
    }

    protected static getLogger(): TapjawLogger {
        return new ConsoleLogger();
    }
}
