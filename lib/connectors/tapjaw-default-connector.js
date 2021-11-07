"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("..");
const connector_register_1 = (0, tslib_1.__importDefault)(require("../reflection/connector-register"));
/**
 * Reflection based configurable HTTP and HTTPS API request wrapper.
 */
class TapjawDefaultConnector extends __1.TapjawHttpConnector {
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
