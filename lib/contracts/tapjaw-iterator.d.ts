export default interface TapjawIterator {
    run(adapterMethod: CallableFunction, limit?: number): Promise<any>;
}
