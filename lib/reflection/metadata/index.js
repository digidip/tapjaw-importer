"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_command_1 = (0, tslib_1.__importDefault)(require("./tapjaw-command"));
const tapjaw_connector_1 = (0, tslib_1.__importDefault)(require("./tapjaw-connector"));
exports.default = {
    Command: tapjaw_command_1.default,
    // @TapjawConfigure.Command.Name()
    // @TapjawConfigure.Command.Description()
    // @TapjawConfigure.Command.Example()
    // @TapjawConfigure.Command.Arguments()
    // @TapjawConfigure.Command.Options()
    // @TapjawConfigure.Command.Action()
    Connector: tapjaw_connector_1.default,
    // @TapjawConfigure.Connector.EnableGzip()
    // @TapjawConfigure.Connector.Decode()
    // @TapjawConfigure.Connector.Encode()
    // @TapjawConfigure.Connector.Host()
    // @TapjawConfigure.Connector.Port()
    // @TapjawConfigure.Connector.protocol()
    // @TapjawConfigure.Connector.Security()
};
