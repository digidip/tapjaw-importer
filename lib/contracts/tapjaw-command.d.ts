import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
import { OutputArgs, OutputFlags } from '@oclif/parser';
import { Arg } from '@oclif/parser/lib/args';
import { ParserInput } from '@oclif/parser/lib/parse';
export default abstract class TapjawCommand extends Command {
    static args: never[];
    static defaultFlags: flags.Input<any>;
    abstract instance: any;
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;
    abstract getAdapterCallback(args: OutputArgs<Arg<any>[]>, flags: OutputFlags<ParserInput['flags']>): CallableFunction;
    run(): Promise<void>;
}
