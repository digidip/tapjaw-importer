import { createHmac } from 'crypto';
import tapjawConfig from '../configs/tapjaw-config';

export type TapjawMessageDigest = string;

/**
 * Payload schema
 */
export type TapjawPayload = Record<string, unknown>;

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
    constructor(sourceProviderName: string, payload: TapjawPayload, importDate?: Date) {
        this.signature = createHmac('sha256', this.getSha256Secret()).update(JSON.stringify(payload)).digest('hex');
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || new Date();
        this.payload = payload;
    }

    /**
     * Secret to salt sha256.
     *
     * @note configured with tapjawConfig by default.
     * @returns string
     */
    protected getSha256Secret(): string {
        return tapjawConfig.getConfig('MESSAGE_SHA256_SECRET');
    }
}
