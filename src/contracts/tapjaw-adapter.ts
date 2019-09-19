import TapjawMessage from './tapjaw-message';

export class TapjawAdapterError extends Error { }

export interface TapjawAdapterArguments {
    [key: string]: any;
}

export type TapjawAdapterCallback<T = TapjawMessage> = () => AsyncGenerator<T>;

/**
 *
 */
interface TapjawAdapter {
}

export default TapjawAdapter;
