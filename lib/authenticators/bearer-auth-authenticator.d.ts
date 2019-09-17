import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
import TapjawConnector from '../contracts/tapjaw-connector';
export default class BearerAuthAuthenticator implements TapjawAuthenticator {
    protected readonly bearerToken: string;
    private authenticated;
    private readonly header;
    constructor(bearerToken: string);
    isAuthenticated(): boolean;
    authenticate(connector: TapjawConnector): Promise<void>;
}
