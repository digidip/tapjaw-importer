import TapjawAuthenticator, { AuthorizationHeaders, TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';
import request from './support/request';

export default class PrefetchTokenAuthorizationHeaderAuthenticator
    implements TapjawAuthenticator<AuthorizationHeaders>
{
    private token!: string;

    constructor(
        protected readonly apiKey: string,
        protected readonly hostname: string,
        protected readonly path: string,
        protected readonly method: string = 'POST'
    ) {}

    isAuthenticated(): boolean {
        return Boolean(this.token);
    }

    public async authenticate(): Promise<AuthorizationHeaders> {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

        const params: string = new URLSearchParams({
            key: 'general',
            secret: this.apiKey
        }).toString();

        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers
        };

        const oauthResponse = await request(params, options);
        if (!oauthResponse) {
            throw new TapjawAuthenticatorError('No token response was recieved.');
        }
        const oauthJson = JSON.parse(oauthResponse) as { data: { token: string } };
        this.token = oauthJson.data.token;

        return {
            Authorization: `Bearer ${this.token}`
        };
    }
}
