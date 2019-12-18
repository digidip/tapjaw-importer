/// <reference types="node" />
import * as https from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { CookieJar } from 'tough-cookie';
import SessionAuthenticator from '../session-authenticator';
export default class ApplyCookieHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    private readonly host;
    protected cookies: CookieJar;
    constructor(authenticator: SessionAuthenticator, host: string);
    authenticate(requestOptionContainer: https.RequestOptions): Promise<https.RequestOptions>;
    private applyCookiesToHeader;
}
