/**
 * @module TapjawConfigs
 */
import DotEnvConfig from './dot-env-config';

/**
 * Tawjaw Importer default configuration loader, responsible for providing
 * all configuration values with a namespace key of `TAPJAW_`.
 */
export class TapjawConfig extends DotEnvConfig {
    constructor() {
        super('Default Tapjaw Config', 'TAPJAW_');
    }
}

const config = new TapjawConfig();

export default config;
