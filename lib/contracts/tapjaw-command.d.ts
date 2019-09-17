import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
export default abstract class TapjawCommand extends Command {
    static args: never[];
    static defaultFlags: flags.Input<any>;
    abstract instance: any;
    abstract flags: flags.Input<any>;
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;
    run(): Promise<void>;
}
