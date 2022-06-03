import TapjawAuthenticator, { AuthorizationHeaders } from '../contracts/tapjaw-authenticator';

export type BearerResponse = AuthorizationHeaders;

export default class BearerAuthAuthenticator implements TapjawAuthenticator<BearerResponse> {
    private authenticated = false;
    private readonly header: BearerResponse;

    constructor(protected readonly bearerToken: string) {
        this.header = {
            Authorization: `Bearer ${bearerToken}`,
        };
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<BearerResponse> {
        this.authenticated = true;
        return Promise.resolve(this.header);
    }
}
