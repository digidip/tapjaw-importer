/* eslint-disable @typescript-eslint/ban-types */
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';

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
export function EnableGzip(): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:enable-gzip', true, target.prototype as object, 'class');
    };
}

/**
 * Set the incoming decoding character set of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Decode({@link TapjawHttpConnectorCharSet})**
 */
export function Decode(type: TapjawHttpConnectorCharSet): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:decode', type, target.prototype as object, 'class');
    };
}

/**
 * Set the outgoing encoding character set on the of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Encode({@link TapjawHttpConnectorCharSet})**
 */
export function Encode(type: TapjawHttpConnectorCharSet): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:encode', type, target.prototype as object, 'class');
    };
}

/**
 * Set host against the Connector. (Required on {@link TapjawDefaultConnector}).
 *
 * @param host string
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Host(string)**
 */
export function Host(host: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:host', host, target.prototype as object, 'class');
    };
}

/**
 * Set port against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * @param port number
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.port(number)**
 */
export function Port(port: number): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:port', port, target.prototype as object, 'class');
    };
}

/**
 * Set protocol against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * Please refer to {@link TapjawHttpConnectorProtocol} for available protocols.
 *
 * @param protocol TapjawHttpConnectorProtocol
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Protocol({@link TapjawHttpConnectorProtocol)**
 */
export function Protocol(protocol: TapjawHttpConnectorProtocol): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:protocol', protocol, target.prototype as object, 'class');
    };
}

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
export function Security(security: TapjawAuthenticationWrapper): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:connector:security', security, target.prototype as object, 'class');
    };
}
