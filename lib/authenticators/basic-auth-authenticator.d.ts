import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
import TapjawConnector from '../contracts/tapjaw-connector';
export default class BasicAuthAuthenticator implements TapjawAuthenticator {
    protected readonly username: string;
    protected readonly password: string;
    private authenticated;
    private readonly header;
    constructor(username: string, password: string);
    isAuthenticated(): boolean;
    authenticate(connector: TapjawConnector): Promise<void>;
}
