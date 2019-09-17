import TapjawMessage from './tapjaw-message';

export class TapjawAdapterError extends Error {}

type TapjawAdapter<T extends TapjawMessage> = () => AsyncGenerator<T>;

export default TapjawAdapter;
