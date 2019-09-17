import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
import { OutputArgs, OutputFlags } from '@oclif/parser';
import { Arg } from '@oclif/parser/lib/args';
import { ParserInput } from '@oclif/parser/lib/parse';
export declare type TapjawCommandArgs = OutputArgs<Arg<any>[]>;
export declare type TapjawCommandFlags = OutputFlags<ParserInput['flags']>;
export default abstract class TapjawCommand extends Command {
    static args: never[];
    static defaultFlags: flags.Input<any>;
    abstract instance: any;
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;
    run(): Promise<void>;
    protected abstract getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): CallableFunction;
}
