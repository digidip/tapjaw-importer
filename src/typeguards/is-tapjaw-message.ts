import TapjawMessage from '../messages/tapjaw-message';

export default function (message: unknown): message is TapjawMessage {
    return Boolean(
        message &&
            typeof message === 'object' &&
            'signature' in message &&
            'sourceProviderName' in message &&
            'import_date' in message &&
            'payload' in message
    );
}
