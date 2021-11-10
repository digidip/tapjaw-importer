"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapjawConfig = void 0;
const tslib_1 = require("tslib");
/**
 * @module TapjawConfigs
 */
const dot_env_config_1 = (0, tslib_1.__importDefault)(require("./dot-env-config"));
/**
 * Tawjaw Importer default configuration loader, responsible for providing
 * all configuration values with a namespace key of `TAPJAW_`.
 */
class TapjawConfig extends dot_env_config_1.default {
    constructor() {
        super('Default Tapjaw Config', 'TAPJAW_');
    }
}
exports.TapjawConfig = TapjawConfig;
const config = new TapjawConfig();
exports.default = config;
