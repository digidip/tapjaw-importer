import TapjawAuthenticator, { AuthorizationHeaders } from '../contracts/tapjaw-authenticator';
import BearerAuthAuthenticator from './bearer-auth-authenticator';
import JWTTokenGenerator from './support/jwt-token-generator';

export type BearerResponse = AuthorizationHeaders;

export default class JWTBearerAuthAuthenticator implements TapjawAuthenticator<BearerResponse> {
    private authenticated = false;

    constructor(protected readonly jwtGenerator: JWTTokenGenerator) {}

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<BearerResponse> {
        const bearer = new BearerAuthAuthenticator(await this.jwtGenerator.getToken());
        this.authenticated = true;
        return bearer.authenticate();
    }
}
