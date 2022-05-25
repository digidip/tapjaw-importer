"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const __1 = require("../../");
const tapjaw_default_connector_1 = (0, tslib_1.__importDefault)(require("../tapjaw-default-connector"));
const tapjaw_http_connector_1 = require("../tapjaw-http-connector");
describe('Make sure TapjawDefaultConnector works as expected.', () => {
    it('should container all the configured metadata values', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Decode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.UTF8),
            __1.TapjawMetadata.Connector.Encode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.UTF8),
            __1.TapjawMetadata.Connector.Host('my.testing.com'),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTPS),
            __1.TapjawMetadata.Connector.Port(123),
            __1.TapjawMetadata.Connector.EnableGzip(),
            __1.TapjawMetadata.Connector.Security(__1.TapjawAuthenticator.createBearerSecurity('xxx'))
        ], TestConnector);
        const connector = new TestConnector();
        expect(connector).toMatchSnapshot();
    });
    it('should override https port check, since .Port(80) is set, also check for latin1', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Decode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.LATIN1),
            __1.TapjawMetadata.Connector.Encode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.LATIN1),
            __1.TapjawMetadata.Connector.Host('my.moo.com'),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTPS),
            __1.TapjawMetadata.Connector.Port(80)
        ], TestConnector);
        const connector = new TestConnector();
        expect(connector).toMatchSnapshot();
    });
    it('should acquire port 443 since HTTPS enabled but no port is specified', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Decode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.LATIN1),
            __1.TapjawMetadata.Connector.Encode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.UTF8),
            __1.TapjawMetadata.Connector.Host('my.moo.com'),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTPS)
        ], TestConnector);
        const connector = new TestConnector();
        expect(connector).toMatchSnapshot();
    });
    it('should simple HTTP connector', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Decode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.LATIN1),
            __1.TapjawMetadata.Connector.Encode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.UTF8),
            __1.TapjawMetadata.Connector.Host('my.moo.com'),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTP)
        ], TestConnector);
        const connector = new TestConnector();
        expect(connector).toMatchSnapshot();
    });
    it('should get error because Host is missing', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Decode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.LATIN1),
            __1.TapjawMetadata.Connector.Encode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.UTF8),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTP)
        ], TestConnector);
        expect(() => new TestConnector()).toThrowError(new __1.TapjawError.TapjawConnectorError(`@TapjawMetadata.Connector.Host(string) is required!`, {
            constructor: { name: 'TapjawConnectorError' },
        }));
    });
    it('should get error because Protocol is missing', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Decode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.LATIN1),
            __1.TapjawMetadata.Connector.Encode(tapjaw_http_connector_1.TapjawHttpConnectorCharSet.UTF8),
            __1.TapjawMetadata.Connector.Host('my.moo.com')
        ], TestConnector);
        expect(() => new TestConnector()).toThrowError(new __1.TapjawError.TapjawConnectorError(`@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.`, {
            constructor: { name: 'TapjawConnectorError' },
        }));
    });
    it('should work with minimal metadata configuration: host (HTTP) + protocol', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Host('my.moo.com'),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTP)
        ], TestConnector);
        const connector = new TestConnector();
        expect(connector).toMatchSnapshot();
    });
    it('should work with minimal metadata configuration: host (HTTPS) + protocol', () => {
        let TestConnector = class TestConnector extends tapjaw_default_connector_1.default {
        };
        TestConnector = (0, tslib_1.__decorate)([
            __1.TapjawMetadata.Connector.Host('my.moo.com'),
            __1.TapjawMetadata.Connector.Protocol(tapjaw_http_connector_1.TapjawHttpConnectorProtocol.HTTPS)
        ], TestConnector);
        const connector = new TestConnector();
        expect(connector).toMatchSnapshot();
    });
});
