"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tapjaw_http_connector_1 = require("../connectors/tapjaw-http-connector");
const tapjaw_connector_error_1 = tslib_1.__importDefault(require("../errors/tapjaw-connector-error"));
function default_1() {
    if (!Reflect.hasMetadata('tapjaw:connector:host', this, 'class')) {
        throw new tapjaw_connector_error_1.default('@TapjawMetadata.Connector.Host(string) is required!', this);
    }
    if (!Reflect.hasMetadata('tapjaw:connector:protocol', this, 'class')) {
        throw new tapjaw_connector_error_1.default('@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.', this);
    }
    this.host = Reflect.getMetadata('tapjaw:connector:host', this, 'class');
    this.protocol = Reflect.getMetadata('tapjaw:connector:protocol', this, 'class');
    if (Reflect.hasMetadata('tapjaw:connector:port', this, 'class')) {
        this.port = Reflect.getMetadata('tapjaw:connector:port', this, 'class');
    }
    else {
        this.port = this.protocol === tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTPS ? 443 : 80;
    }
    if (Reflect.hasMetadata('tapjaw:connector:enable-gzip', this, 'class') &&
        Reflect.getMetadata('tapjaw:connector:enable-gzip', this, 'class') === true) {
        this.enableGzip = true;
    }
    if (Reflect.hasMetadata('tapjaw:connector:decode', this, 'class')) {
        this.setDecoding(Reflect.getMetadata('tapjaw:connector:decode', this, 'class'));
    }
    if (Reflect.hasMetadata('tapjaw:connector:encode', this, 'class')) {
        this.setEncoding(Reflect.getMetadata('tapjaw:connector:encode', this, 'class'));
    }
    if (Reflect.hasMetadata('tapjaw:connector:security', this, 'class')) {
        this.security = Reflect.getMetadata('tapjaw:connector:security', this, 'class');
    }
    return this;
}
exports.default = default_1;
