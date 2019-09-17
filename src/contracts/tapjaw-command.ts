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
    };

    abstract instance: any; // @todo see if we can honour Parser.Input
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;

    abstract getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): CallableFunction;

    async run() {
        const { args, flags } = this.parse(this.instance);

        await this.iterator.run(
            this.getAdapterCallback(args, flags),
            flags.limit && Number.isInteger(flags.limit) ? flags.limit : undefined
        );
    }
}
