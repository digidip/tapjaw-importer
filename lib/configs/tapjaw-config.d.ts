import DotEnvConfig from './dot-env-config';
/**
 * Tawjaw Importer default configuration loader, responsible for providing
 * all configuration values with a namespace key of `TAPJAW_`.
 */
export declare class TapjawConfig extends DotEnvConfig {
    constructor();
}
/**
 * Tapjaw default configuration instance, managing all configurations with namespace: `TAPJAW_`.
 *
 * @function TapjawConfig.getConfig(string)
 * @see {@link TapjawConfig}
 * @param   string  configKey   Configuration key.
 * @returns string
 */
declare function getTapjawConfig(configKey: string): string;
declare namespace getTapjawConfig {
    var toNumber: (configKey: string) => number;
    var toBoolean: (configKey: string) => boolean;
}
export default getTapjawConfig;
