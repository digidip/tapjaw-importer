import TapjawAuthenticator, { HttpHeaders } from '../contracts/tapjaw-authenticator';
export declare type CustomHeaders = [string, string];
export default class CustomHeaderAuthenticator implements TapjawAuthenticator<HttpHeaders> {
    private headers;
    constructor(headers: CustomHeaders[]);
    isAuthenticated(): boolean;
    authenticate(): Promise<HttpHeaders>;
}
