import TapjawAdapter from '../contracts/tapjaw-adapter';
import TapjawMessage from '../messages/tapjaw-message';
export default class TapjawAdapterError extends Error {
    parentStack?: string;
    constructor(message: unknown, adapter: TapjawAdapter<unknown, TapjawMessage>);
}
