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
export declare function EnableGzip(): CallableFunction;
/**
 * Set the incoming decoding character set of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Decode({@link TapjawHttpConnectorCharSet})**
 */
export declare function Decode(type: TapjawHttpConnectorCharSet): CallableFunction;
/**
 * Set the outgoing encoding character set on the of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Encode({@link TapjawHttpConnectorCharSet})**
 */
export declare function Encode(type: TapjawHttpConnectorCharSet): CallableFunction;
/**
 * Set host against the Connector. (Required on {@link TapjawDefaultConnector}).
 *
 * @param host string
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Host(string)**
 */
export declare function Host(host: string): CallableFunction;
/**
 * Set port against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * @param port number
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.port(number)**
 */
export declare function Port(port: number): CallableFunction;
/**
 * Set protocol against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * Please refer to {@link TapjawHttpConnectorProtocol} for available protocols.
 *
 * @param protocol TapjawHttpConnectorProtocol
 * @returns CallableFunction
 * @function **@TapjawConfigure.Connector.Protocol({@link TapjawHttpConnectorProtocol)**
 */
export declare function Protocol(protocol: TapjawHttpConnectorProtocol): CallableFunction;
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
export declare function Security(security: TapjawAuthenticationWrapper): CallableFunction;
