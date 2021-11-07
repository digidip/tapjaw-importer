/* eslint-disable @typescript-eslint/ban-types */
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';

export default {
    EnableGzip: () => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:enable-gzip', true, target.prototype as object, 'class');
        };
    },
    Decode: (type: TapjawHttpConnectorCharSet) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:decode', type, target.prototype as object, 'class');
        };
    },
    Encode: (type: TapjawHttpConnectorCharSet) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:encode', type, target.prototype as object, 'class');
        };
    },
    Host: (host: string) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:host', host, target.prototype as object, 'class');
        };
    },
    Port: (port: number) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:port', port, target.prototype as object, 'class');
        };
    },
    Protocol: (protocol: TapjawHttpConnectorProtocol) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:protocol', protocol, target.prototype as object, 'class');
        };
    },
    Security: (security: TapjawAuthenticationWrapper) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:connector:security', security, target.prototype as object, 'class');
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
