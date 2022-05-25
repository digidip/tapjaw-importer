import TapjawAuthenticator from "../contracts/tapjaw-authenticator";
export declare type URIToken = string;
export default class PreauthUriTokenAuthenticator implements TapjawAuthenticator<URIToken> {
    protected readonly hostname: string;
    protected readonly path: string;
    protected readonly method: string;
    protected readonly tokenJsonPath: string;
    protected readonly params: {};
    protected readonly headers: {};
    private token;
    constructor(hostname: string, path: string, method: string, tokenJsonPath: string, params?: {}, headers?: {});
    isAuthenticated(): boolean;
    authenticate(): Promise<URIToken>;
}
