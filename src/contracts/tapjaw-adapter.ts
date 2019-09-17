import TapjawMessage from './tapjaw-message';

export class TapjawAdapterError extends Error {}

type TapjawAdapterType<T, U extends TapjawMessage> = {
    [P in keyof T]: () => Promise<U>
};

// tslint:disable:no-unnecessary-class
export default abstract class TapjawAdapter<M extends TapjawMessage> implements TapjawAdapterType<TapjawAdapter<TapjawMessage>, M> {
}
