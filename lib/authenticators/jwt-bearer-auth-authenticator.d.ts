import TapjawAuthenticator, { AuthorizationHeaders } from '../contracts/tapjaw-authenticator';
import JWTBuilder from './jwt/jwt-builder';
export declare type JWTBearerResponse = AuthorizationHeaders;
export default class JWTBearerAuthAuthenticator implements TapjawAuthenticator<JWTBearerResponse> {
    protected readonly jwtBuilder: JWTBuilder;
    private authenticated;
    constructor(jwtBuilder: JWTBuilder);
    isAuthenticated(): boolean;
    authenticate(): Promise<JWTBearerResponse>;
}
