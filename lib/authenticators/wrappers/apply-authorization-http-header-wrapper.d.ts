/// <reference types="node" />
import TapjawAuthenticator, { AuthorizationHeaders } from '../../contracts/tapjaw-authenticator';
import https from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
export default class ApplyAuthorizationHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    protected authenticationData?: AuthorizationHeaders;
    constructor(authenticator: TapjawAuthenticator<AuthorizationHeaders>);
    authenticate(requestOptionContainer: https.RequestOptions): Promise<https.RequestOptions>;
    private applyAuthorizationHeader;
}
