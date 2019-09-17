import TapjawMessage from './tapjaw-message';

export class TapjawAdapterError extends Error {}

interface TapjawAdapter<T extends TapjawMessage> {
    (): AsyncGenerator<T>;
}

export default TapjawAdapter;
