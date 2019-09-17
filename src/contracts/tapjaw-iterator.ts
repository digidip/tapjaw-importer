import TapjawMessage from './tapjaw-message';

/*
Example:
    class Moo implements TapjawIterator {
        public async * iterate(): AsyncGenerator<TapjawMessage> {
            yield new TapjawMessage('Cat', {});
            yield new TapjawMessage('Dog', {});
        }
    }
*/
export default interface TapjawIterator<T = TapjawMessage> {
    iterate(): AsyncIterableIterator<T>;
}
