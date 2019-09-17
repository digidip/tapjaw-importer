import { TapjawAdapterArguments } from './tapjaw-adapter';
export default interface TapjawIterator {
    run(adapterMethod: CallableFunction, args: TapjawAdapterArguments): Promise<any>;
}
