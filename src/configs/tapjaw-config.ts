import { TapjawConfigError } from '../errors';
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

/**
 * Tapjaw default configuration instance, managing all configurations with namespace: `TAPJAW_`.
 *
 * @function TapjawConfig.getConfig(string)
 * @see {@link TapjawConfig}
 * @param   string  configKey   Configuration key.
 * @returns string
 */
function getTapjawConfig(configKey: string): string {
    return config.getConfig(configKey);
}

getTapjawConfig.toNumber = function (configKey: string): number {
    return Number(getTapjawConfig(configKey));
};

getTapjawConfig.toBoolean = function (configKey: string): boolean {
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
            throw new TapjawConfigError(
                `Config key "${configKey}" on "${TapjawConfig.name}" is not a valid boolean value. ` +
                    'Valid values: 1, 0, yes, no, true or false.'
            );
    }
};

export default getTapjawConfig;
