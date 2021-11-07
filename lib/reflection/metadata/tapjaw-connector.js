"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    EnableGzip: () => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:enable-gzip', true, target.prototype, 'class');
        };
    },
    Decode: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:decode', type, target.prototype, 'class');
        };
    },
    Encode: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:encode', type, target.prototype, 'class');
        };
    },
    Host: (host) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:host', host, target.prototype, 'class');
        };
    },
    Port: (port) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:port', port, target.prototype, 'class');
        };
    },
    Protocol: (protocol) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:protocol', protocol, target.prototype, 'class');
        };
    },
    Security: (security) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:connector:security', security, target.prototype, 'class');
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
