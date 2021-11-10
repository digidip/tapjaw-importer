import TapjawAuthenticator, { AuthorizationHeaders } from '../contracts/tapjaw-authenticator';
import JWTBuilder from './jwt/jwt-builder';
export declare type JWTBearerResponse = AuthorizationHeaders;
export default class JWTBearerAuthAuthenticator implements TapjawAuthenticator<JWTBearerResponse> {
    protected readonly jwtGenerator: JWTBuilder;
    private authenticated;
    constructor(jwtGenerator: JWTBuilder);
    isAuthenticated(): boolean;
    authenticate(): Promise<JWTBearerResponse>;
}
