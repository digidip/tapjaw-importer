"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    EnableGzip: () => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:enable-gzip', true, target);
    },
    Decode: (type) => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:decode', type, target);
    },
    Encode: (type) => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:encode', type, target);
    },
    Host: (host) => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:host', host, target);
    },
    Port: (port) => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:port', port, target);
    },
    Protocol: (protocol) => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:protocol', protocol, target);
    },
    Security: (security) => {
        return (target) => Reflect.defineMetadata('tapjaw:connector:security', security, target);
    },
};
// @TapjawConfigure.Connector.EnableGzip()
// @TapjawConfigure.Connector.Decode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Encode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Host('tapjaw.free.beeceptor.com')
// @TapjawConfigure.Connector.Port(443)
// @TapjawConfigure.Connector.protocol(TapjawHttpConnectorConfig.protocol_HTTPS)
// @TapjawConfigure.Connector.Security(createBearerSecurity('xxxx'))
