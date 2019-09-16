import TapjawConnector from "./tapjaw-connector";

export class TapjawAuthenticatorError extends Error {}

export default interface TapjawAuthenticator {
    isAuthenticated(): boolean;
    authenticate(connector: TapjawConnector): Promise<void>;
}
