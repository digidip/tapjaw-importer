/// <reference types="node" />
import TapjawAuthenticator from '../../contracts/tapjaw-authenticator';
import https from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { OauthResponse } from '../oauth-authenticator';
export default class ApplyOauthAuthorizationHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    protected authenticationData?: OauthResponse;
    constructor(authenticator: TapjawAuthenticator<OauthResponse>);
    authenticate(requestOptionContainer: https.RequestOptions): Promise<https.RequestOptions>;
    private applyAuthorizationHeader;
}
