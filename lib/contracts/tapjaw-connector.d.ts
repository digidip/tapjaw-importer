export declare class TapjawConnectorError extends Error {
}
export interface TapjawConnectorResponse {
}
export default interface TapjawConnector {
    setAuthenticatorData(authenticatorData: any): void;
}
