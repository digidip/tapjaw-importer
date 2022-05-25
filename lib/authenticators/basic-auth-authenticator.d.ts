import TapjawAuthenticator, { AuthorizationHeaders } from "../contracts/tapjaw-authenticator";
export declare type BasicAuthResponse = AuthorizationHeaders;
export default class BasicAuthAuthenticator implements TapjawAuthenticator<BasicAuthResponse> {
    protected readonly username: string;
    protected readonly password: string;
    private authenticated;
    private readonly headers;
    constructor(username: string, password: string);
    isAuthenticated(): boolean;
    authenticate(): Promise<BasicAuthResponse>;
}
