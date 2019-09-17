import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
import { OutputArgs, OutputFlags } from '@oclif/parser';
import { Arg } from '@oclif/parser/lib/args';
import { ParserInput } from '@oclif/parser/lib/parse';

export type TapjawCommandArgs = OutputArgs<Arg<any>[]>;
export type TapjawCommandFlags = OutputFlags<ParserInput['flags']>;

export default abstract class TapjawCommand extends Command {
    static args = [];
    static defaultFlags: flags.Input<any> = {
        help: flags.help({ char: 'h' }),
        limit: flags.integer({ char: 'l', description: 'Limit the number of outputted JSON messages' }),
    };

    abstract instance: any; // @todo see if we can honour Parser.Input
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;

    async run() {
        const { args, flags } = this.parse(this.instance);

        await this.iterator.run(
            this.getAdapterCallback(args, flags),
            flags.limit && Number.isInteger(flags.limit) ? flags.limit : undefined
        );
    }

    protected abstract getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): CallableFunction;
}
