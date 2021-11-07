import { TapjawHttpConnector } from '..';
import connectorRegister from '../reflection/connector-register';

/**
 * Reflection based configurable HTTP and HTTPS API request wrapper.
 */
export default abstract class TapjawDefaultConnector extends TapjawHttpConnector {
    public constructor() {
        super('initialising');

        // Load Reflection configurations
        connectorRegister.call(this);
    }
}
