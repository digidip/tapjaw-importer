import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
import TapjawMessage from './tapjaw-message';
export default abstract class TapjawCommand extends Command {
    static args: never[];
    static defaultFlags: flags.Input<any>;
    abstract instance: any;
    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter<TapjawMessage>;
    run(): Promise<void>;
}
