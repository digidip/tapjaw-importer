"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    EnableGzip: () => {
        return Reflect.metadata('tapjaw:connector:enable-gzip', true);
    },
    Decode: (type) => {
        return Reflect.metadata('tapjaw:connector:decode', type);
    },
    Encode: (type) => {
        return Reflect.metadata('tapjaw:connector:encode', type);
    },
    Host: (host) => {
        return Reflect.metadata('tapjaw:connector:host', host);
    },
    Port: (port) => {
        return Reflect.metadata('tapjaw:connector:port', port);
    },
    Protocol: (protocol) => {
        return Reflect.metadata('tapjaw:connector:protocol', protocol);
    },
    Security: (security) => {
        return Reflect.metadata('tapjaw:connector:security', security);
    },
};
// @TapjawConfigure.Connector.EnableGzip()
// @TapjawConfigure.Connector.Decode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Encode(TapjawHttpConnectorConfig.CHARSET_UTF8)
// @TapjawConfigure.Connector.Host('tapjaw.free.beeceptor.com')
// @TapjawConfigure.Connector.Port(443)
// @TapjawConfigure.Connector.protocol(TapjawHttpConnectorConfig.protocol_HTTPS)
// @TapjawConfigure.Connector.Security(createBearerSecurity('xxxx'))
