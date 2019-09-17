import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
export default abstract class TapjawCommand extends Command {
    abstract instance: any;
    abstract flags: flags.Input<any>;
    static args: never[];
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;
    protected defaultFlags: flags.Input<any>;
    run(): Promise<void>;
}
