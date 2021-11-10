import TapjawHttpConnector from './tapjaw-http-connector';
import connectorRegister from '../reflection/connector-register';

/**
 * Reflection based configurable HTTP and HTTPS API request wrapper.
 */
export default abstract class TapjawDefaultConnector extends TapjawHttpConnector {
    public enableGzip = false;
    public useDecoding = void 0;
    public useEncoding = void 0;

    public constructor() {
        super('initialising');

        // Load Reflection configurations
        connectorRegister.call(this);
    }
}
