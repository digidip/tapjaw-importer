/// <reference types="node" />
import TapjawAuthenticator, { HttpHeaders } from "../contracts/tapjaw-authenticator";
export declare type OauthRefreshResponse = HttpHeaders & Record<"access_token", string> & Record<"refresh_token", string>;
export default class OauthRefreshAuthenticator implements TapjawAuthenticator<OauthRefreshResponse> {
    protected readonly clientId: string;
    protected readonly clientSecret: string;
    protected readonly hostname: string;
    protected readonly path: string;
    protected readonly postParams: Record<string, string>;
    protected readonly method: string;
    protected readonly responseEncoding: BufferEncoding;
    private authenticated;
    private lastResponse;
    constructor(clientId: string, clientSecret: string, hostname: string, path: string, postParams: Record<string, string>, method?: string, responseEncoding?: BufferEncoding);
    isAuthenticated(): boolean;
    authenticate(): Promise<OauthRefreshResponse>;
    getLastResponse(): OauthRefreshResponse | null;
    refreshToken(): Promise<OauthRefreshResponse>;
}
