"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
// @todo Create a mechanism to import configurations from child project.
const secret = 'Move me to a configuration!';
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
        this.signature = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
        this.sourceProviderName = sourceProviderName;
        this.import_date = importDate || new Date();
        this.payload = payload;
    }
}
exports.default = TapjawMessage;
