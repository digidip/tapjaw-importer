import TapjawAuthenticator from "../contracts/tapjaw-authenticator";
export default class BearerAuthAuthenticator implements TapjawAuthenticator {
    protected readonly bearerToken: string;
    private authenticated;
    private readonly header;
    constructor(bearerToken: string);
    isAuthenticated(): boolean;
    authenticate(): Promise<{
        Authorization: string;
    }>;
}
