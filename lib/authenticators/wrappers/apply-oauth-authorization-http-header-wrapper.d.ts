/// <reference types="node" />
import TapjawAuthenticator from '../../contracts/tapjaw-authenticator';
import https from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
declare type HttpHeaders = {
    [key: string]: string;
};
export default class ApplyOauthAuthorizationHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    protected authenticationData: HttpHeaders | undefined;
    constructor(authenticator: TapjawAuthenticator);
    authenticate(requestOptionContainer: https.RequestOptions): Promise<https.RequestOptions>;
    private applyAuthorizationHeader;
}
export {};
