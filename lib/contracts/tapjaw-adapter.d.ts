import TapjawMessage from './tapjaw-message';
export declare class TapjawAdapterError extends Error {
}
export interface TapjawAdapterArguments {
    [key: string]: any;
}
export declare type TapjawAdapterCallback<T = TapjawMessage> = () => AsyncGenerator<T>;
declare type TapjawAdapter<T, U extends TapjawMessage> = {
    [P in keyof T]: TapjawAdapterCallback<U> | number | boolean | string | any[];
};
export default TapjawAdapter;
