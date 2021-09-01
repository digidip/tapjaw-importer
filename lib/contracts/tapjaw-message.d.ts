export declare type TapjawMessageDigest = string;
/**
 * Payload schema
 */
export declare type TapjawPayload = Record<string, unknown>;
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
    constructor(sourceProviderName: string, payload: TapjawPayload, importDate?: Date);
}
