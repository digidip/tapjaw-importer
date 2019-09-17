import TapjawMessage from './tapjaw-message';
export declare class TapjawAdapterError extends Error {
}
declare type TapjawAdapter<T extends TapjawMessage> = () => AsyncGenerator<T>;
export default TapjawAdapter;
