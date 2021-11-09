/// <reference types="node" />
import TapjawAuthenticator, { AuthorizationHeaders } from '../../contracts/tapjaw-authenticator';
import { RequestOptions } from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
export default class ApplyAuthorizationHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    protected authenticationData?: AuthorizationHeaders;
    constructor(authenticator: TapjawAuthenticator<AuthorizationHeaders>);
    authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions>;
    private applyAuthorizationHeader;
}
