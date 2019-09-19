import TapjawAuthenticator from '../contracts/tapjaw-authenticator';

export default class BasicAuthAuthenticator implements TapjawAuthenticator {
    private authenticated = false;
    private readonly headers: { Authorization: string; };

    constructor(protected readonly username: string, protected readonly password: string) {
        this.headers = {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        };
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<{ Authorization: string; }> {
        return new Promise(resolve => {
            this.authenticated = true;
            resolve(this.headers);
        });
    }
}
