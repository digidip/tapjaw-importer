import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
import { IConfig } from '@oclif/config';

export default abstract class TapjawCommand extends Command {
    abstract instance: any; // @todo see if we can honour Parser.Input
    abstract flags: flags.Input<any>;
    static args = [];

    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;
    protected defaultFlags: flags.Input<any> = {
        help: flags.help({ char: 'h' }),
    };

    // protected setDependency(adapter: TapjawAdapter, iterator: TapjawIterator): void {
    //     this.adapter = adapter;
    //     this.iterator = iterator;
    // }

    async run() {
        const { args, flags } = this.parse(this.instance);

        this.log('hi');
    }
}
