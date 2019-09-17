import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
import TapjawConnector from '../contracts/tapjaw-connector';

export default class BearerAuthAuthenticator implements TapjawAuthenticator {
    private authenticated = false;
    private readonly header: { Authorization: string; };

    constructor(protected readonly bearerToken: string) {
        this.header = {
            Authorization: `Bearer ${bearerToken}`
        };
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(connector: TapjawConnector): Promise<void> {
        return new Promise(resolve => {
            this.authenticated = true;
            connector.setAuthenticatorData(this.header);
            resolve();
        });
    }
}
