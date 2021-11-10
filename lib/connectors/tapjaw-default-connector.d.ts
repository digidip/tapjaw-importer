import TapjawHttpConnector from './tapjaw-http-connector';
/**
 * Reflection based configurable HTTP and HTTPS API request wrapper.
 */
export default abstract class TapjawDefaultConnector extends TapjawHttpConnector {
    enableGzip: boolean;
    useDecoding: undefined;
    useEncoding: undefined;
    constructor();
}
