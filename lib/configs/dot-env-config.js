"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * @module TapjawConfigs
 */
const tapjaw_config_error_1 = (0, tslib_1.__importDefault)(require("../errors/tapjaw-config-error"));
const namespace_filter_token_1 = (0, tslib_1.__importDefault)(require("./support/namespace-filter-token"));
/**
 * The default process.env configuration loader for Tapjaw Importer.
 */
class DotEnvConfig {
    /**
     * @param configName                string  Custom name for the config loader class.
     * @param configNamespaceKey        string  The namespace key which this class should load. For example `APP_`
     *                                          will import all configurations values starting with key `APP_*.
     */
    constructor(configName, configNamespaceKey) {
        this.configName = configName;
        this.configNamespaceKey = configNamespaceKey;
        this.config = new Map();
        Object.keys(process.env)
            .filter((envKey) => (0, namespace_filter_token_1.default)(envKey, this.configNamespaceKey))
            .forEach(this.initialiseConfig.bind(this));
    }
    /**
     * Get a configuration value from the available configurations in this classes namespace.
     *
     * @param configKey string  The configuration key minus the `this.configNamespaceKey`.
     *                          For example `APP_NAME` would be requested with `this.getConfig('NAME');`.
     * @returns string | never
     * @throws {@link TapjawConfigError}
     */
    getConfig(configKey) {
        const key = configKey.toLowerCase();
        if (!this.config.has(key)) {
            throw new tapjaw_config_error_1.default(`${this.configName} key "${key}" does not exist.`);
        }
        return this.config.get(key);
    }
    /**
     * Register a configuration name and value into this configuration instance.
     *
     * @param jobsEnvKey string The fullname of the configuration key to registered.
     */
    initialiseConfig(jobsEnvKey) {
        const configStr = process.env[jobsEnvKey];
        if (!configStr) {
            throw new tapjaw_config_error_1.default(`.evn ${this.configName} variable "${jobsEnvKey}" is empty.`);
        }
        this.config.set(jobsEnvKey.replace(this.configNamespaceKey, '').toLowerCase(), configStr);
    }
}
exports.default = DotEnvConfig;
