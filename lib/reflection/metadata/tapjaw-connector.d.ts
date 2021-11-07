import { TapjawAuthenticationWrapper } from '../..';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';
declare const _default: {
    EnableGzip: () => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Decode: (type: TapjawHttpConnectorCharSet) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Encode: (type: TapjawHttpConnectorCharSet) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Host: (host: string) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Port: (port: number) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Protocol: (protocol: TapjawHttpConnectorProtocol) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Security: (security: TapjawAuthenticationWrapper) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
};
export default _default;
