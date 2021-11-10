"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = exports.Protocol = exports.Port = exports.Host = exports.Encode = exports.Decode = exports.EnableGzip = void 0;
/**
 * @module TapjawMetadata.Connector
 *
 * [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) decorator methods for the {@link TapjawDefaultConnector}.
 */
/**
 * Enable gzip inflation of the response body for a Connector.
 *
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.EnableGzip()**
 */
function EnableGzip() {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:enable-gzip', true, target.prototype, 'class');
    };
}
exports.EnableGzip = EnableGzip;
/**
 * Set the incoming decoding character set of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Decode({@link TapjawHttpConnectorCharSet})**
 */
function Decode(type) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:decode', type, target.prototype, 'class');
    };
}
exports.Decode = Decode;
/**
 * Set the outgoing encoding character set on the of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Encode({@link TapjawHttpConnectorCharSet})**
 */
function Encode(type) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:encode', type, target.prototype, 'class');
    };
}
exports.Encode = Encode;
/**
 * Set host against the Connector. (Required on {@link TapjawDefaultConnector}).
 *
 * @param host string
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Host(string)**
 */
function Host(host) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:host', host, target.prototype, 'class');
    };
}
exports.Host = Host;
/**
 * Set port against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * @param port number
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.port(number)**
 */
function Port(port) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:port', port, target.prototype, 'class');
    };
}
exports.Port = Port;
/**
 * Set protocol against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * Please refer to {@link TapjawHttpConnectorProtocol} for available protocols.
 *
 * @param protocol TapjawHttpConnectorProtocol
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Protocol({@link TapjawHttpConnectorProtocol)**
 */
function Protocol(protocol) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:protocol', protocol, target.prototype, 'class');
    };
}
exports.Protocol = Protocol;
/**
 * Optionally set security against the Connector.
 *
 * Please refer to {@link TapjawAuthenticationWrapper} for available wrappers.
 *
 * @note you can these functions to simply of the defining of security authenticators:
 * - {@link createBasicSecurity}
 * - {@link createBasicSecurity}
 * - {@link createJWTSecurity}
 * - {@link createOAuthSecurity}
 *
 * @param protocol TapjawHttpConnectorProtocol
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Protocol(TapjawHttpConnectorProtocol)**
 */
function Security(security) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:connector:security', security, target.prototype, 'class');
    };
}
exports.Security = Security;
