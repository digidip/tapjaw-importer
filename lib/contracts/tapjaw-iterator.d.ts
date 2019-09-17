import TapjawMessage from './tapjaw-message';
export default interface TapjawIterator<T = TapjawMessage> {
    iterate(): Promise<T>;
}
