import TapjawAuthenticator, { TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';

export type QueryParameters = Record<string, string>;

export default class QueryStringAuthenticator implements TapjawAuthenticator<QueryParameters> {
    constructor(protected readonly queryParameters: QueryParameters) {}

    isAuthenticated(): boolean {
        return Object.keys(this.queryParameters).length > 0;
    }

    public async authenticate(): Promise<QueryParameters> {
        if (!this.isAuthenticated()) {
            throw new TapjawAuthenticatorError('No QueryParameters provided to authenticator');
        }

        return Promise.resolve(this.queryParameters);
    }
}
