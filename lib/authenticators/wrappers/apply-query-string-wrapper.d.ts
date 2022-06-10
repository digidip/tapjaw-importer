/// <reference types="node" />
import { RequestOptions } from 'https';
import { TapjawAuthenticationWrapper } from '../../contracts';
import QueryStringAuthenticator from '../query-string-authenticator';
export default class ApplyQueryStringWrapper implements TapjawAuthenticationWrapper {
    private readonly authenticator;
    constructor(authenticator: QueryStringAuthenticator);
    authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions>;
    private applyAuthParametersToPath;
}
