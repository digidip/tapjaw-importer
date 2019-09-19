import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
export default class BasicAuthAuthenticator implements TapjawAuthenticator {
    protected readonly username: string;
    protected readonly password: string;
    private authenticated;
    private readonly headers;
    constructor(username: string, password: string);
    isAuthenticated(): boolean;
    authenticate(): Promise<{
        Authorization: string;
    }>;
}
