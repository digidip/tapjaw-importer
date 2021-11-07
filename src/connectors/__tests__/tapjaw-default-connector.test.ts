import 'reflect-metadata';
import { createBearerSecurity, TapjawMetadata } from '../..';
import { TapjawConnectorError } from '../../errors/tapjaw-connector-error';
import TapjawDefaultConnector from '../tapjaw-default-connector';
import TapjawHttpConnector, {
    TapjawHttpQueryParameters,
    ArrayParameter,
    DuplicateParameter,
    TapjawHttpConnectorCharSet,
    TapjawHttpConnectorProtocol,
} from '../tapjaw-http-connector';

describe('Make sure TapjawDefaultConnector works as expected.', () => {
    it('should container all the configured metadata values', () => {
        @TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.UTF8)
        @TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.UTF8)
        @TapjawMetadata.Connector.Host('my.testing.com')
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTPS)
        @TapjawMetadata.Connector.Port(123)
        @TapjawMetadata.Connector.EnableGzip()
        @TapjawMetadata.Connector.Security(createBearerSecurity('xxx'))
        class TestConnector extends TapjawDefaultConnector {}
        const connector = new TestConnector();

        expect(connector).toMatchSnapshot();
    });

    it('should override https port check, since .Port(80) is set, also check for latin1', () => {
        @TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.LATIN1)
        @TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.LATIN1)
        @TapjawMetadata.Connector.Host('my.moo.com')
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTPS)
        @TapjawMetadata.Connector.Port(80)
        class TestConnector extends TapjawDefaultConnector {}
        const connector = new TestConnector();

        expect(connector).toMatchSnapshot();
    });

    it('should acquire port 443 since HTTPS enabled but no port is specified', () => {
        @TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.LATIN1)
        @TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.UTF8)
        @TapjawMetadata.Connector.Host('my.moo.com')
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTPS)
        class TestConnector extends TapjawDefaultConnector {}
        const connector = new TestConnector();

        expect(connector).toMatchSnapshot();
    });

    it('should simple HTTP connector', () => {
        @TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.LATIN1)
        @TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.UTF8)
        @TapjawMetadata.Connector.Host('my.moo.com')
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTP)
        class TestConnector extends TapjawDefaultConnector {}
        const connector = new TestConnector();

        expect(connector).toMatchSnapshot();
    });

    it('should get error because Host is missing', () => {
        @TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.LATIN1)
        @TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.UTF8)
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTP)
        class TestConnector extends TapjawDefaultConnector {}

        expect(() => new TestConnector()).toThrowError(
            new TapjawConnectorError(`@TapjawMetadata.Connector.Host(string) is required!`, {
                constructor: { name: 'TapjawConnectorError' },
            } as unknown as TestConnector)
        );
    });

    it('should get error because Protocol is missing', () => {
        @TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.LATIN1)
        @TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.UTF8)
        @TapjawMetadata.Connector.Host('my.moo.com')
        class TestConnector extends TapjawDefaultConnector {}

        expect(() => new TestConnector()).toThrowError(
            new TapjawConnectorError(`@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.`, {
                constructor: { name: 'TapjawConnectorError' },
            } as unknown as TestConnector)
        );
    });

    it('should work with minimal metadata configuration: host (HTTP) + protocol', () => {
        @TapjawMetadata.Connector.Host('my.moo.com')
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTP)
        class TestConnector extends TapjawDefaultConnector {}
        const connector = new TestConnector();

        expect(connector).toMatchSnapshot();
    });

    it('should work with minimal metadata configuration: host (HTTPS) + protocol', () => {
        @TapjawMetadata.Connector.Host('my.moo.com')
        @TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTPS)
        class TestConnector extends TapjawDefaultConnector {}
        const connector = new TestConnector();

        expect(connector).toMatchSnapshot();
    });
});
