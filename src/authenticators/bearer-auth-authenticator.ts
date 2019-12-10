import TapjawAuthenticator from "../contracts/tapjaw-authenticator";

export default class BearerAuthAuthenticator implements TapjawAuthenticator {
    private authenticated = false;
    private readonly header: { Authorization: string };

    constructor(protected readonly bearerToken: string) {
        this.header = {
            Authorization: `Bearer ${bearerToken}`
        };
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<{ Authorization: string }> {
        return new Promise(resolve => {
            this.authenticated = true;
            resolve(this.header);
        });
    }
}
