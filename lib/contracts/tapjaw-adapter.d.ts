import TapjawMessage from './tapjaw-message';
export declare class TapjawAdapterError extends Error {
}
export interface TapjawAdapterArguments {
    [key: string]: unknown;
}
export declare type TapjawAdapterCallback<T extends TapjawMessage> = () => AsyncGenerator<T>;
export declare type GenericMethod = () => unknown;
declare type TapjawAdapter<T, U extends TapjawMessage> = {
    [P in keyof T]: TapjawAdapterCallback<U> | GenericMethod | number | boolean | string | unknown[];
};
export default TapjawAdapter;
