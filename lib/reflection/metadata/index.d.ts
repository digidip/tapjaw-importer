declare const _default: {
    Command: {
        Name: (type: string) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Description: (type: string) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Example: (type: string) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Arguments: (...args: import("commander").Argument[]) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Options: (...args: import("../..").CommandOption[]) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Action: (action: import("../..").CommandAction) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
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
