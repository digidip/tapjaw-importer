import TapjawMessage from './tapjaw-message';
export default interface TapjawIterator<T = TapjawMessage> {
    iterate(): AsyncIterableIterator<T>;
}
