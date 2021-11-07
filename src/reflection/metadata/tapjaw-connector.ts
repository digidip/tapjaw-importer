import { TapjawAuthenticationWrapper } from '../..';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';

export default {
    EnableGzip: () => {
        return Reflect.metadata('tapjaw:connector:enable-gzip', true);
    },
    Decode: (type: TapjawHttpConnectorCharSet) => {
        return Reflect.metadata('tapjaw:connector:decode', type);
    },
    Encode: (type: TapjawHttpConnectorCharSet) => {
        return Reflect.metadata('tapjaw:connector:encode', type);
    },
    Host: (host: string) => {
        return Reflect.metadata('tapjaw:connector:host', host);
    },
    Port: (port: number) => {
        return Reflect.metadata('tapjaw:connector:port', port);
    },
    Protocol: (protocol: TapjawHttpConnectorProtocol) => {
        return Reflect.metadata('tapjaw:connector:protocol', protocol);
    },
    Security: (security: TapjawAuthenticationWrapper) => {
        return Reflect.metadata('tapjaw:connector:security', security);
    },
};

// @TapjawConfigure.Connector.EnableGzip()
// @TapjawConfigure.Connector.Decode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Encode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Host('tapjaw.free.beeceptor.com')
// @TapjawConfigure.Connector.Port(443)
// @TapjawConfigure.Connector.Protocal(TapjawHttpConnectorConfig.PROTOCAL_HTTPS)
// @TapjawConfigure.Connector.Security(createBearerSecurity('xxxx'))
