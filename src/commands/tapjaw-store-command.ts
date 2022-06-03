import TapjawMessage from '../messages/tapjaw-message';
import TapjawCommand, { TapjawCommandArgs, TapjawCommandFlags } from '../contracts/tapjaw-command';
import split2 from 'split2';
import through from 'through';
import { Command } from 'commander';
import TapjawLogger from '../contracts/tapjaw-logger';
import ConsoleLogger from '../support/console-logger';
import jsonMessageParser from '../parsers/json-message-parser';
import { isTapjawMessage } from '../typeguards';
import commandRegister from '../reflection/command-register';

export default abstract class TapjawStoreCommand<T extends TapjawCommandFlags, M extends TapjawMessage>
    implements TapjawCommand
{
    public constructor(
        protected readonly stdin: NodeJS.ReadableStream,
        protected readonly displayJsonParseErrors = false
    ) {}

    /**
     * Run the command the execute the iterator run routine.
     *
     */
    public async run(args: TapjawCommandArgs, flags: T): Promise<void> {
        const instance = <typeof TapjawStoreCommand>this.constructor;

        return new Promise((resolve, reject) => {
            process.on('beforeExit', () => {
                this.onBeforeExit(args, flags).catch((error: Error) => instance.getLogger().error(error));
            });

            this.stdin
                .pipe(split2())
                .pipe(
                    through((line: string): void => {
                        const message = jsonMessageParser<M>(line, this.displayJsonParseErrors, instance.getLogger());

                        if (isTapjawMessage(message)) {
                            this.onStoreMessage(message, args, flags).catch(instance.getLogger().error);
                        }
                    })
                )
                .on('end', resolve)
                .on('error', reject);
        });
    }

    protected abstract onStoreMessage(message: M, args: TapjawCommandArgs, flags: T): Promise<void>;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected onBeforeExit(args: TapjawCommandArgs, flags: T): Promise<void> {
        return Promise.resolve();
    }

    public static register(program: Command): void {
        commandRegister.call(this as unknown as TapjawCommand, program);
    }

    protected static getLogger(): TapjawLogger {
        return new ConsoleLogger();
    }
}
