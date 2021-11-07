import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';
declare const _default: {
    EnableGzip: () => (target: object) => void;
    Decode: (type: TapjawHttpConnectorCharSet) => (target: object) => void;
    Encode: (type: TapjawHttpConnectorCharSet) => (target: object) => void;
    Host: (host: string) => (target: object) => void;
    Port: (port: number) => (target: object) => void;
    Protocol: (protocol: TapjawHttpConnectorProtocol) => (target: object) => void;
    Security: (security: TapjawAuthenticationWrapper) => (target: object) => void;
};
export default _default;
