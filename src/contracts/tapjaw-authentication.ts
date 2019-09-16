import TapjawConnector from "./tapjaw-connector";

export default interface TapjawAuthentication {
    isAuthenticated(): boolean;
    authenticate(connector: TapjawConnector): Promise<void>;
}
