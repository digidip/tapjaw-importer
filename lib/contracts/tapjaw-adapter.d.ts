import TapjawMessage from './tapjaw-message';
export declare class TapjawAdapterError extends Error {
}
export default interface TapjawAdapter<T = TapjawMessage> {
    [key: string]: () => Promise<T>;
}
