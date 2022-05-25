import TapjawAuthenticator, { AuthorizationHeaders } from "../contracts/tapjaw-authenticator";
export default class PrefetchTokenAuthorizationHeaderAuthenticator implements TapjawAuthenticator<AuthorizationHeaders> {
    protected readonly apiKey: string;
    protected readonly hostname: string;
    protected readonly path: string;
    protected readonly method: string;
    private token;
    constructor(apiKey: string, hostname: string, path: string, method?: string);
    isAuthenticated(): boolean;
    authenticate(): Promise<AuthorizationHeaders>;
}
