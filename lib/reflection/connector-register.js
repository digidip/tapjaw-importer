"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_http_connector_1 = require("../connectors/tapjaw-http-connector");
const tapjaw_connector_error_1 = require("../errors/tapjaw-connector-error");
function default_1() {
    if (!Reflect.hasMetadata('tapjaw:connector:host', this)) {
        throw new tapjaw_connector_error_1.TapjawConnectorError(`@TapjawMetadata.Connector.Host(string) is required!`, this);
    }
    if (!Reflect.hasMetadata('tapjaw:connector:protocol', this)) {
        throw new tapjaw_connector_error_1.TapjawConnectorError('@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.', this);
    }
    this.host = Reflect.getMetadata('tapjaw:connector:host', this);
    this.protocol = Reflect.getMetadata('tapjaw:connector:protocol', this);
    if (Reflect.hasMetadata('tapjaw:connector:port', this)) {
        this.port = Reflect.getMetadata('tapjaw:connector:port', this);
    }
    else {
        this.port = this.protocol === tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTPS ? 443 : 80;
    }
    if (Reflect.hasMetadata('tapjaw:connector:enable-gzip', this) &&
        Reflect.getMetadata('tapjaw:connector:enable-gzip', this) === true) {
        this.enableGzip = true;
    }
    if (Reflect.hasMetadata('tapjaw:connector:decode', this)) {
        this.setDecoding(Reflect.getMetadata('tapjaw:connector:decode', this));
    }
    if (Reflect.hasMetadata('tapjaw:connector:encode', this)) {
        this.setEncoding(Reflect.getMetadata('tapjaw:connector:encode', this));
    }
    if (Reflect.hasMetadata('tapjaw:connector:security', this)) {
        this.security = Reflect.getMetadata('tapjaw:connector:security', this);
    }
    return this;
}
exports.default = default_1;
