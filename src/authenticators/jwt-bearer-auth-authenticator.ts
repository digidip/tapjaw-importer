import TapjawAuthenticator, { AuthorizationHeaders } from "../contracts/tapjaw-authenticator";
import BearerAuthAuthenticator from "./bearer-auth-authenticator";
import JWTBuilder from "./jwt/jwt-builder";

export type JWTBearerResponse = AuthorizationHeaders;

export default class JWTBearerAuthAuthenticator implements TapjawAuthenticator<JWTBearerResponse> {
    private authenticated = false;

    constructor(protected readonly jwtBuilder: JWTBuilder) {}

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<JWTBearerResponse> {
        const bearer = new BearerAuthAuthenticator(await this.jwtBuilder.getToken());
        this.authenticated = true;
        return bearer.authenticate();
    }
}
