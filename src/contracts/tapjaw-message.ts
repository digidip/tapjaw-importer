import crypto from 'crypto';
import tapjawMessageConfig from '../configs/tapjaw-message-config';

export type TapjawMessageDigest = string;

/**
 * Payload schema
 */
export interface TapjawPayload {
    [key: string]: any;
}

/**
 * Base data-interchange message container.
 *
 * Holds an arbitary payload from an third party source, as well as meta information about the payload.
 */
export default class TapjawMessage {
    /**
     * Collective identifier from the origin of this message.
     *
     * For Example:
     * Name of the service which provided the payload.
     */
    sourceProviderName: string;

    /**
     * A SHA256 hash of the payload content.
     */
    signature: TapjawMessageDigest;

    /**
     * The date/time this message was created.
     */
    import_date: Date;

    /**
     * An arbitrary payload from a third party source.
     */
    payload: TapjawPayload;

    /**
     * Create a new message.
     *
     * @param sourceProviderName string
     * @param payload TapjawPayload
     * @param importDate Date           Optional, if _no_ date is provided the current system's date time will be set.
     */
    constructor(
        sourceProviderName: string,
        payload: TapjawPayload,
        importDate?: Date
    ) {
        this.signature = crypto
            .createHmac('sha256', tapjawMessageConfig.getConfig('secret'))
            .update(JSON.stringify(payload))
            .digest('hex') as TapjawMessageDigest;
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || new Date();
        this.payload = payload;
    }
}
