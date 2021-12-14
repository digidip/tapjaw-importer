import 'reflect-metadata';
/**
 * @namespace TapjawContract
 */
export * as TapjawContract from './contracts';
/**
 * @namespace TapjawCommand
 */
export * as TapjawCommand from './commands';
/**
 * @namespace TapjawConnector
 */
export * as TapjawConnector from './connectors';
/**
 * @namespace TapjawIterator
 */
export * as TapjawIterator from './iterators';
/**
 * @namespace TapjawAuthenticator
 */
export * as TapjawAuthenticator from './authenticators';
/**
 * @namespace TapjawParser
 */
export * as TapjawParser from './parsers';
/**
 * @namespace TapjawConfig
 */
export * as TapjawConfig from './configs';
/**
 * @namespace TapjawDate
 */
export * as TapjawDate from './date';
/**
 * @namespace TapjawError
 */
export * as TapjawError from './errors';
/**
 * @namespace TapjawTypeguard
 */
export * as TapjawTypeguard from './typeguards';
/**
 * # TapjawMetadata
 *
 * TapjawMetadata.Command and TapjawMetadata.Connector are reflect-metadata decorator methods used to set options on
 * {@link TapjawApiCommand}, {@link TapjawFilterCommand}, {@link TapjawStoreCommand}, {@link TapjawToolCommand}
 * and {@link TapjawDefaultConnector} instances.
 *
 * ### Connector metadata decorator methods:
 * ```typescript
 * @TapjawMetadata.Connector.EnableGzip()
 * @TapjawMetadata.Connector.Decode(charset: TapjawHttpConnectorCharSet)
 * @TapjawMetadata.Connector.Encode(charset: TapjawHttpConnectorCharSet)
 * @TapjawMetadata.Connector.Host(host: string)
 * @TapjawMetadata.Connector.port(port: number)
 * @TapjawMetadata.Connector.Protocol(protocol: TapjawHttpConnectorProtocol)
 * @TapjawMetadata.Connector.Security(protocol: TapjawAuthenticationWrapper)
 * ```
 *
 * ### Command metadata decorator methods:
 * ```typescript
 * @TapjawMetadata.Command.Name(name: string)
 * @TapjawMetadata.Command.Description(desc: string)
 * @TapjawMetadata.Command.Example(example: string)
 * @TapjawMetadata.Command.Arguments(args: Argument[])
 * @TapjawMetadata.Command.Options(opts: CommandOption[])
 * @TapjawMetadata.Command.Action(action: CommandAction)
 * ```
 * @packageDescription
 */
export * as TapjawMetadata from './reflection';
/**
 * @namespace TapjawMessage
 */
export * as TapjawMessage from './messages';
