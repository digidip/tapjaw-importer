
export default interface TapjawIterator {
    run(adapterMethod: CallableFunction): Promise<any>;
}
