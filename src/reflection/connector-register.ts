import { TapjawAuthenticationWrapper } from '..';
import TapjawDefaultConnector from '../connectors/tapjaw-default-connector';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../connectors/tapjaw-http-connector';

export default function (this: TapjawDefaultConnector): TapjawDefaultConnector {
    if (!Reflect.hasMetadata('tapjaw:connector:host', this)) {
        throw new Error(`@TapjawMetadata.Connector.Host(string) is required!`);
    }
    if (!Reflect.hasMetadata('tapjaw:connector:protocal', this)) {
        throw new Error('@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol) is required.');
    }

    this.host = Reflect.getMetadata('tapjaw:connector:host', this) as string;
    this.protocol = Reflect.getMetadata('tapjaw:connector:protocol', this) as TapjawHttpConnectorProtocol;

    if (Reflect.hasMetadata('tapjaw:connector:port', this)) {
        this.port = Reflect.getMetadata('tapjaw:connector:port', this) as number;
    } else {
        this.port = this.protocol === TapjawHttpConnectorProtocol.HTTPS ? 443 : 80;
    }

    if (
        Reflect.hasMetadata('tapjaw:connector:enable-gzip', this) &&
        Reflect.getMetadata('tapjaw:connector:enable-gzip', this) === true
    ) {
        this.enableGzip = true;
    }

    if (Reflect.hasMetadata('tapjaw:connector:decode', this)) {
        this.setDecoding(Reflect.getMetadata('tapjaw:connector:decode', this) as TapjawHttpConnectorCharSet);
    }

    if (Reflect.hasMetadata('tapjaw:connector:encode', this)) {
        this.setEncoding(Reflect.getMetadata('tapjaw:connector:encode', this) as TapjawHttpConnectorCharSet);
    }

    if (Reflect.hasMetadata('tapjaw:connector:security', this)) {
        this.security = Reflect.getMetadata('tapjaw:connector:security', this) as TapjawAuthenticationWrapper;
    }

    return this;
}
