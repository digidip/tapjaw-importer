"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = require("crypto");
const tapjaw_message_config_1 = (0, tslib_1.__importDefault)(require("../configs/tapjaw-message-config"));
/**
 * Base data-interchange message container.
 *
 * Holds an arbitary payload from an third party source, as well as meta information about the payload.
 */
class TapjawMessage {
    /**
     * Create a new message.
     *
     * @param sourceProviderName string
     * @param payload TapjawPayload
     * @param importDate Date           Optional, if _no_ date is provided the current system's date time will be set.
     */
    constructor(sourceProviderName, payload, importDate) {
        this.signature = (0, crypto_1.createHmac)('sha256', this.getSha256Secret()).update(JSON.stringify(payload)).digest('hex');
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || new Date();
        this.payload = payload;
    }
    /**
     * Secret to salt sha256.
     *
     * @note configured with tapjawMessageConfig by default.
     * @returns string
     */
    getSha256Secret() {
        return tapjaw_message_config_1.default.getConfig('secret');
    }
}
exports.default = TapjawMessage;
