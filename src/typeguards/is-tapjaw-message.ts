import TapjawMessage from '../contracts/tapjaw-message';

export default (message: unknown): message is TapjawMessage => {
    return Boolean(
        message &&
            typeof message === 'object' &&
            'signature' in message &&
            'sourceProviderName' in message &&
            'import_date' in message &&
            'payload' in message
    );
};
