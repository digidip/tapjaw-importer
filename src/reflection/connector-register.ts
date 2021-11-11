import TapjawAuthenticationWrapper from '../contracts/tapjaw-authentication-wrapper';
import TapjawDefaultConnector from '../connectors/tapjaw-default-connector';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../connectors/tapjaw-http-connector';
import TapjawConnectorError from '../errors/tapjaw-connector-error';

export default function (this: TapjawDefaultConnector): TapjawDefaultConnector {
    if (!Reflect.hasMetadata('tapjaw:connector:host', this, 'class')) {
        throw new TapjawConnectorError(`@TapjawMetadata.Connector.Host(string) is required!`, this);
    }
    if (!Reflect.hasMetadata('tapjaw:connector:protocol', this, 'class')) {
        throw new TapjawConnectorError(
            '@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.',
            this
        );
    }

    this.host = Reflect.getMetadata('tapjaw:connector:host', this, 'class') as string;
    this.protocol = Reflect.getMetadata('tapjaw:connector:protocol', this, 'class') as TapjawHttpConnectorProtocol;

    if (Reflect.hasMetadata('tapjaw:connector:port', this, 'class')) {
        this.port = Reflect.getMetadata('tapjaw:connector:port', this, 'class') as number;
    } else {
        this.port = this.protocol === TapjawHttpConnectorProtocol.HTTPS ? 443 : 80;
    }

    if (
        Reflect.hasMetadata('tapjaw:connector:enable-gzip', this, 'class') &&
        Reflect.getMetadata('tapjaw:connector:enable-gzip', this, 'class') === true
    ) {
        this.enableGzip = true;
    }

    if (Reflect.hasMetadata('tapjaw:connector:decode', this, 'class')) {
        this.setDecoding(Reflect.getMetadata('tapjaw:connector:decode', this, 'class') as TapjawHttpConnectorCharSet);
    }

    if (Reflect.hasMetadata('tapjaw:connector:encode', this, 'class')) {
        this.setEncoding(Reflect.getMetadata('tapjaw:connector:encode', this, 'class') as TapjawHttpConnectorCharSet);
    }

    if (Reflect.hasMetadata('tapjaw:connector:security', this, 'class')) {
        this.security = Reflect.getMetadata('tapjaw:connector:security', this, 'class') as TapjawAuthenticationWrapper;
    }

    return this;
}
