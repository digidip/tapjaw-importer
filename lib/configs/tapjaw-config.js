"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapjawConfig = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("../errors");
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
/**
 * Tapjaw default configuration instance, managing all configurations with namespace: `TAPJAW_`.
 *
 * @function TapjawConfig.getConfig(string)
 * @see {@link TapjawConfig}
 * @param   string  configKey   Configuration key.
 * @returns string
 */
function getTapjawConfig(configKey) {
    return config.getConfig(configKey);
}
getTapjawConfig.toNumber = function (configKey) {
    return Number(getTapjawConfig(configKey));
};
getTapjawConfig.toBoolean = function (configKey) {
    const value = getTapjawConfig(configKey);
    switch (value.toLowerCase()) {
        case 'yes':
        case 'true':
        case '1':
            return true;
        case 'no':
        case 'false':
        case '0':
            return true;
        default:
            throw new errors_1.TapjawConfigError(`Config key "${configKey}" on "${TapjawConfig.name}" is not a valid boolean value. ` +
                `Valid values: 1, 0, yes, no, true or false.`);
    }
};
exports.default = getTapjawConfig;
