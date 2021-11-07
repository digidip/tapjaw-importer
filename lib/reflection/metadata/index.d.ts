declare const _default: {
    Command: {
        Name: (type: string) => (target: Function) => void;
        Description: (type: string) => (target: Function) => void;
        Example: (type: string) => (target: Function) => void;
        Arguments: (...args: import("commander").Argument[]) => (target: Function) => void;
        Options: (...args: import("../..").CommandOption[]) => (target: Function) => void;
        Action: (action: import("../..").CommandAction) => (target: Function) => void;
    };
    Connector: {
        EnableGzip: () => (target: Function) => void;
        Decode: (type: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorCharSet) => (target: Function) => void;
        Encode: (type: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorCharSet) => (target: Function) => void;
        Host: (host: string) => (target: Function) => void;
        Port: (port: number) => (target: Function) => void;
        Protocol: (protocol: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorProtocol) => (target: Function) => void;
        Security: (security: import("../..").TapjawAuthenticationWrapper) => (target: Function) => void;
    };
};
export default _default;
