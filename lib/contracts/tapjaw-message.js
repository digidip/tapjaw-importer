"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const tapjaw_message_config_1 = tslib_1.__importDefault(require("../configs/tapjaw-message-config"));
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
        this.signature = crypto_1.default
            .createHmac('sha256', tapjaw_message_config_1.default.getConfig('secret'))
            .update(JSON.stringify(payload))
            .digest('hex');
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || new Date();
        this.payload = payload;
    }
}
exports.default = TapjawMessage;
