import DotEnvConfig from './dot-env-config';

class TapjawConfig extends DotEnvConfig {
    constructor() {
        super('Default Tapjaw Config', 'TAPJAW_');
    }
}

export default new TapjawConfig();
