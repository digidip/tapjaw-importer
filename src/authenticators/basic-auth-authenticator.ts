import TapjawAuthenticator, { AuthorizationHeaders } from "../contracts/tapjaw-authenticator";

export type BasicAuthResponse = AuthorizationHeaders;

export default class BasicAuthAuthenticator implements TapjawAuthenticator<BasicAuthResponse> {
    private authenticated = false;
    private readonly headers: BasicAuthResponse;

    constructor(protected readonly username: string, protected readonly password: string) {
        this.headers = {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
        };
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<BasicAuthResponse> {
        this.authenticated = true;
        return Promise.resolve(this.headers);
    }
}
