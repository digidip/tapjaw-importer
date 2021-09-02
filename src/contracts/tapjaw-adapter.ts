import TapjawMessage from './tapjaw-message';

export class TapjawAdapterError extends Error {}

export type TapjawAdapterArguments = Record<string, unknown>;

export type TapjawAdapterCallback<
    T extends TapjawMessage
> = () => AsyncGenerator<T>;

export type GenericMethod = () => unknown;

type TapjawAdapter<T, U extends TapjawMessage> = {
    [P in keyof T]:
        | TapjawAdapterCallback<U>
        | GenericMethod
        | number
        | boolean
        | string
        | unknown[];
};

export default TapjawAdapter;
