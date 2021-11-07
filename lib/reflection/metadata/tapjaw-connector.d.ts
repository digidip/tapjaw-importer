import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { TapjawHttpConnectorCharSet, TapjawHttpConnectorProtocol } from '../../connectors/tapjaw-http-connector';
declare const _default: {
    EnableGzip: () => (target: Function) => void;
    Decode: (type: TapjawHttpConnectorCharSet) => (target: Function) => void;
    Encode: (type: TapjawHttpConnectorCharSet) => (target: Function) => void;
    Host: (host: string) => (target: Function) => void;
    Port: (port: number) => (target: Function) => void;
    Protocol: (protocol: TapjawHttpConnectorProtocol) => (target: Function) => void;
    Security: (security: TapjawAuthenticationWrapper) => (target: Function) => void;
};
export default _default;
