import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
export declare type QueryParameters = Record<string, string>;
export default class QueryStringAuthenticator implements TapjawAuthenticator<QueryParameters> {
    protected readonly queryParameters: QueryParameters;
    constructor(queryParameters: QueryParameters);
    isAuthenticated(): boolean;
    authenticate(): Promise<QueryParameters>;
}
