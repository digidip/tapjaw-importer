import TapjawMessage from './tapjaw-message';

export class TapjawAdapterError extends Error { }

export interface TapjawAdapterArguments {
    [key: string]: any;
}

export type TapjawAdapterCallback<T = TapjawMessage> = () => AsyncGenerator<T>;

type TapjawAdapter<T, U extends TapjawMessage> = {
    [P in keyof T]: TapjawAdapterCallback<U> | number | boolean | string | any[];
};

export default TapjawAdapter;
