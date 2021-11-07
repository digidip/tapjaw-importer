import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';

export default {
    EnableGzip: () => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:enable-gzip', true, target);
        };
    },
    Decode: (type: TapjawHttpConnectorCharSet) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:decode', type, target);
        };
    },
    Encode: (type: TapjawHttpConnectorCharSet) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:encode', type, target);
        };
    },
    Host: (host: string) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:host', host, target);
        };
    },
    Port: (port: number) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:port', port, target);
        };
    },
    Protocol: (protocol: TapjawHttpConnectorProtocol) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:protocol', protocol, target);
        };
    },
    Security: (security: TapjawAuthenticationWrapper) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:connector:security', security, target);
        };
    },
};

// @TapjawConfigure.Connector.EnableGzip()
// @TapjawConfigure.Connector.Decode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Encode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Host('tapjaw.free.beeceptor.com')
// @TapjawConfigure.Connector.Port(443)
// @TapjawConfigure.Connector.protocol(TapjawHttpConnectorConfig.protocol_HTTPS)
// @TapjawConfigure.Connector.Security(createBearerSecurity('xxxx'))
