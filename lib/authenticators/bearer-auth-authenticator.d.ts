import TapjawAuthenticator, { AuthorizationHeaders } from '../contracts/tapjaw-authenticator';
export declare type BearerResponse = AuthorizationHeaders;
export default class BearerAuthAuthenticator implements TapjawAuthenticator<BearerResponse> {
    protected readonly bearerToken: string;
    private authenticated;
    private readonly header;
    constructor(bearerToken: string);
    isAuthenticated(): boolean;
    authenticate(): Promise<BearerResponse>;
}
