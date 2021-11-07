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
        EnableGzip: () => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Decode: (type: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorCharSet) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Encode: (type: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorCharSet) => {
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
        Protocol: (protocol: import("../../connectors/tapjaw-http-connector").TapjawHttpConnectorProtocol) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
        Security: (security: import("../..").TapjawAuthenticationWrapper) => {
            (target: Function): void;
            (target: Object, propertyKey: string | symbol): void;
        };
    };
};
export default _default;
