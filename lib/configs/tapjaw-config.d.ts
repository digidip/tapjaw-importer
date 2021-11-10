/**
 * @module TapjawConfigs
 */
import DotEnvConfig from './dot-env-config';
/**
 * Tawjaw Importer default configuration loader, responsible for providing
 * all configuration values with a namespace key of `TAPJAW_`.
 */
export declare class TapjawConfig extends DotEnvConfig {
    constructor();
}
declare const config: TapjawConfig;
export default config;
