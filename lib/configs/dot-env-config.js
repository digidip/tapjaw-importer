"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_config_error_1 = tslib_1.__importDefault(require("../errors/tapjaw-config-error"));
const namespace_filter_token_1 = tslib_1.__importDefault(require("./support/namespace-filter-token"));
class DotEnvConfig {
    constructor(configName, configKey) {
        this.configName = configName;
        this.configKey = configKey;
        this.config = {};
        Object.keys(process.env)
            .filter((envKey) => namespace_filter_token_1.default(envKey, this.configKey))
            .forEach(this.initialiseConfig.bind(this));
    }
    getConfig(configKey) {
        const key = configKey.toLowerCase();
        if (!this.config[key]) {
            throw new tapjaw_config_error_1.default(`${this.configName} key "${key}" does not exist.`);
        }
        return this.config[key];
    }
    initialiseConfig(jobsEnvKey) {
        const configStr = process.env[jobsEnvKey];
        if (!configStr) {
            throw new tapjaw_config_error_1.default(`.evn ${this.configName} variable "${jobsEnvKey}" is empty.`);
        }
        this.config[jobsEnvKey.replace(this.configKey, '').toLowerCase()] = configStr;
    }
}
exports.default = DotEnvConfig;
