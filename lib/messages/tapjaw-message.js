"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = require("crypto");
const tapjaw_config_1 = (0, tslib_1.__importDefault)(require("../configs/tapjaw-config"));
const utc_date_1 = (0, tslib_1.__importDefault)(require("../date/utc-date"));
/**
 * @module TapjawMessage
 *
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
class TapjawMessage {
    /**
     * Create a new message.
     *
     * @param sourceProviderName string An identifier which will identify the message's source.
     * @param payload TapjawPayload     A Record<string, unknown> payload with all properties sorted by the key name to
     *                                  guarantee a consistent signature between API responses.
     * @param importDate Date           An optional date for the message. (Default: current UTC date/time)
     */
    constructor(sourceProviderName, payload, importDate) {
        this.signature = (0, crypto_1.createHmac)('sha256', this.getSha256Secret()).update(JSON.stringify(payload)).digest('hex');
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || utc_date_1.default.now();
        this.payload = payload;
    }
    /**
     * Sha256 secret for salting the message signature.
     *
     * @note configured with {@link TapjawConfig} by default.
     *
     * @returns string
     */
    getSha256Secret() {
        return tapjaw_config_1.default.getConfig('MESSAGE_SHA256_SECRET');
    }
}
exports.default = TapjawMessage;
