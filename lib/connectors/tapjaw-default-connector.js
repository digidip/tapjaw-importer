"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_http_connector_1 = (0, tslib_1.__importDefault)(require("./tapjaw-http-connector"));
const connector_register_1 = (0, tslib_1.__importDefault)(require("../reflection/connector-register"));
/**
 * Reflection based configurable HTTP and HTTPS API request wrapper.
 */
class TapjawDefaultConnector extends tapjaw_http_connector_1.default {
    constructor() {
        super('initialising');
        this.enableGzip = false;
        this.useDecoding = void 0;
        this.useEncoding = void 0;
        // Load Reflection configurations
        connector_register_1.default.call(this);
    }
}
exports.default = TapjawDefaultConnector;
