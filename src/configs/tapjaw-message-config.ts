
import DotEnvConfig from './dot-env-config';

class TapjawMessageConfig extends DotEnvConfig {
    constructor() {
        super(
            'Tapjaw Message Config',
            'TAPJAW_MESSAGE_'
        );
    }
}

export default new TapjawMessageConfig();
