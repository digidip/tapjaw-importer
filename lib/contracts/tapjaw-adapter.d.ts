import TapjawMessage from './tapjaw-message';
export declare class TapjawAdapterError extends Error {
}
declare type TapjawAdapterType<T, U extends TapjawMessage> = {
    [P in keyof T]: () => Promise<U>;
};
export default abstract class Adapter implements TapjawAdapterType<Adapter, TapjawMessage> {
}
export {};
