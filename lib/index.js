"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapjawMessage = exports.TapjawMetadata = exports.TapjawTypeguard = exports.TapjawError = exports.TapjawDate = exports.TapjawConfig = exports.TapjawParser = exports.TapjawAuthenticator = exports.TapjawIterator = exports.TapjawConnector = exports.TapjawCommand = exports.TapjawContract = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
/**
 * @namespace TapjawContract
 */
exports.TapjawContract = tslib_1.__importStar(require("./contracts"));
/**
 * @namespace TapjawCommand
 */
exports.TapjawCommand = tslib_1.__importStar(require("./commands"));
/**
 * @namespace TapjawConnector
 */
exports.TapjawConnector = tslib_1.__importStar(require("./connectors"));
/**
 * @namespace TapjawIterator
 */
exports.TapjawIterator = tslib_1.__importStar(require("./iterators"));
/**
 * @namespace TapjawAuthenticator
 */
exports.TapjawAuthenticator = tslib_1.__importStar(require("./authenticators"));
/**
 * @namespace TapjawParser
 */
exports.TapjawParser = tslib_1.__importStar(require("./parsers"));
/**
 * @namespace TapjawConfig
 */
exports.TapjawConfig = tslib_1.__importStar(require("./configs"));
/**
 * @namespace TapjawDate
 */
exports.TapjawDate = tslib_1.__importStar(require("./date"));
/**
 * @namespace TapjawError
 */
exports.TapjawError = tslib_1.__importStar(require("./errors"));
/**
 * @namespace TapjawTypeguard
 */
exports.TapjawTypeguard = tslib_1.__importStar(require("./typeguards"));
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
exports.TapjawMetadata = tslib_1.__importStar(require("./reflection"));
/**
 * @namespace TapjawMessage
 */
exports.TapjawMessage = tslib_1.__importStar(require("./messages"));
