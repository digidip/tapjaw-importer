import { createHmac } from 'crypto';
import tapjawConfig from '../configs/tapjaw-config';
import utcDate from '../date/utc-date';

export type TapjawMessageDigest = string;

/**
 * Payload schema
 */
export type TapjawPayload = Record<string, unknown>;

/**
 * Default Tapjaw Importer data-interchange message container
 *
 * The primary feature of the class is to contain an arbitrary key=>value styled payload and associated metadata
 * about the payload.
 * The payload is designed as a "free object" (Record<string, unknown>) to allow API responses to get stored after
 * being parsed and formatted by an adapter.
 *
 * The designed purpose of `TapjawMessage` is to allow for data interchange between commands with a consistent schema,
 * all messages which inherit the `TapjawMessage` class will automatically acquire a sha256 `signature` property hashed
 * from the payload. Additionally, a `sourceProviderName` and`import_date` properties are present for grouping purposes.
 *
 * After the message has passed through `JSON.stringify()`, it will generally have an output looking similar to:
 * ```json
 * {
 *     "sourceProvideName": "set in constructor",
 *     "signature": "",
 *     "import_date": "<date at instantiation of message>",
 *     "payload": {
 *         "a": "b",
 *         "c": 1
 *     },
 *     // .. any other properties assigned after `TapjawMessage` gets extended.
 * }
 * ```
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
     *
     * @Note please sort the properties prior to generating a signature. The reason is that an API may change the order
     *       of properties in delivery and will cause a different signature to get generated.
     */
    payload: TapjawPayload;

    /**
     * Create a new message.
     *
     * @param sourceProviderName string An identifier which will identify the message's source.
     * @param payload TapjawPayload     A Record<string, unknown> payload with all properties sorted by the key name to
     *                                  guarantee a consistent signature between API responses.
     * @param importDate Date           An optional date for the message. (Default: current UTC date/time)
     */
    constructor(sourceProviderName: string, payload: TapjawPayload, importDate?: Date) {
        this.signature = createHmac('sha256', this.getSha256Secret()).update(JSON.stringify(payload)).digest('hex');
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || utcDate.now();
        this.payload = payload;
    }

    /**
     * Sha256 secret for salting the message signature.
     *
     * @note configured with {@link TapjawConfig} by default.
     *
     * @returns string
     */
    protected getSha256Secret(): string {
        return tapjawConfig('MESSAGE_SHA256_SECRET');
    }
}
