export default interface TapjawIterator {
    run(method: CallableFunction, args: any): Promise<any>;
}
