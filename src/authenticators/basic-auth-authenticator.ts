import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
import TapjawConnector from '../contracts/tapjaw-connector';


export default class BasicAuthAuthenticator implements TapjawAuthenticator {
    private authenticated = false;
    private header: { Authorization: string; };

    constructor(protected readonly username: string, protected readonly password: string) {
        this.header = {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
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
