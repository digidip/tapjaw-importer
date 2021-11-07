declare const _default: {
    Command: {
        Name: (type: string) => (target: object) => void;
        Description: (type: string) => (target: object) => void;
        Example: (type: string) => (target: object) => void;
        Arguments: (...args: import("commander").Argument[]) => (target: object) => void;
        Options: (...args: import("../..").CommandOption[]) => (target: object) => void;
        Action: (action: import("../..").CommandAction) => (target: object) => void;
    };
    Connector: {
        EnableGzip: () => (target: object) => void;
        Decode: (type: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorCharSet) => (target: object) => void;
        Encode: (type: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorCharSet) => (target: object) => void;
        Host: (host: string) => (target: object) => void;
        Port: (port: number) => (target: object) => void;
        Protocol: (protocol: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorProtocol) => (target: object) => void;
        Security: (security: import("../..").TapjawAuthenticationWrapper) => (target: object) => void;
    };
};
export default _default;
