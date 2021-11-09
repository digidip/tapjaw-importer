import TapjawAuthenticator, { AuthorizationHeaders } from '../contracts/tapjaw-authenticator';
import JWTTokenGenerator from './support/jwt-token-generator';
export declare type BearerResponse = AuthorizationHeaders;
export default class JWTBearerAuthAuthenticator implements TapjawAuthenticator<BearerResponse> {
    protected readonly jwtGenerator: JWTTokenGenerator;
    private authenticated;
    constructor(jwtGenerator: JWTTokenGenerator);
    isAuthenticated(): boolean;
    authenticate(): Promise<BearerResponse>;
}
