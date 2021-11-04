import TapjawAdapter from '../contracts/tapjaw-adapter';
import TapjawMessage from '../contracts/tapjaw-message';
export default class AdapterError extends Error {
    parentStack?: string;
    constructor(message: unknown, adapter: TapjawAdapter<unknown, TapjawMessage>);
}
