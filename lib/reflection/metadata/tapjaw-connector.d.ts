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
 * @function **@TapjawMetadata.Connector.EnableGzip()**
 */
export declare function EnableGzip(): CallableFunction;
/**
 * Set the incoming decoding character set of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawMetadata.Connector.Decode({@link TapjawHttpConnectorCharSet})**
 */
export declare function Decode(type: TapjawHttpConnectorCharSet): CallableFunction;
/**
 * Set the outgoing encoding character set on the of a response body.
 *
 * @param type TapjawHttpConnectorCharSet
 * @returns CallableFunction
 * @function **@TapjawMetadata.Connector.Encode({@link TapjawHttpConnectorCharSet})**
 */
export declare function Encode(type: TapjawHttpConnectorCharSet): CallableFunction;
/**
 * Set host against the Connector. (Required on {@link TapjawDefaultConnector}).
 *
 * @param host string
 * @returns CallableFunction
 * @function **@TapjawMetadata.Connector.Host(string)**
 */
export declare function Host(host: string): CallableFunction;
/**
 * Set port against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * @param port number
 * @returns CallableFunction
 * @function **@TapjawMetadata.Connector.port(number)**
 */
export declare function Port(port: number): CallableFunction;
/**
 * Set protocol against the Connector (Required on {@link TapjawDefaultConnector}).
 *
 * Please refer to {@link TapjawHttpConnectorProtocol} for available protocols.
 *
 * @param protocol TapjawHttpConnectorProtocol
 * @returns CallableFunction
 * @function **@TapjawMetadata.Connector.Protocol({@link TapjawHttpConnectorProtocol})**
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
 * @function **@TapjawMetadata.Connector.Security({@link TapjawAuthenticationWrapper})**
 */
export declare function Security(security: TapjawAuthenticationWrapper): CallableFunction;
