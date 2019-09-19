import TapjawMessage from './tapjaw-message';
export declare class TapjawAdapterError extends Error {
}
export interface TapjawAdapterArguments {
    [key: string]: any;
}
export declare type TapjawAdapterCallback<T = TapjawMessage> = () => AsyncGenerator<T>;
/**
 *
 */
interface TapjawAdapter {
}
export default TapjawAdapter;
