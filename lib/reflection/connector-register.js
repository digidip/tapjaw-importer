"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_http_connector_1 = require("../connectors/tapjaw-http-connector");
function default_1() {
    if (!Reflect.hasMetadata('tapjaw:connector:host', this)) {
        throw new Error(`@TapjawMetadata.Connector.Host(string) is required!`);
    }
    if (!Reflect.hasMetadata('tapjaw:connector:protocal', this)) {
        throw new Error('@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.');
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
