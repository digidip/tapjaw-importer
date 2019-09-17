import TapjawConnector from "./tapjaw-connector";
export declare class TapjawAuthenticatorError extends Error {
}
export default interface TapjawAuthenticator {
    isAuthenticated(): boolean;
    authenticate(connector: TapjawConnector): Promise<void>;
}
