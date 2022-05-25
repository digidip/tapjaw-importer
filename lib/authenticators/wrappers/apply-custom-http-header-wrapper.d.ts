/// <reference types="node" />
import { RequestOptions } from 'http';
import TapjawAuthenticator from '../../contracts/tapjaw-authenticator';
import { TapjawAuthenticationWrapper } from '../../contracts';
import { HttpHeaders } from '../../contracts/tapjaw-authenticator';
export default class ApplyCustomHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    constructor(authenticator: TapjawAuthenticator<HttpHeaders>);
    protected headers: HttpHeaders;
    authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions>;
    private applyCustomHeader;
}
