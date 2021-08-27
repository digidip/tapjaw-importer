import querystring from 'querystring';
import TapjawAuthenticator, { HttpHeaders, TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';
import request from './support/request';

export type OauthResponse = HttpHeaders & Record<'access_token', string>;

export const isOauthResponse = (obj: unknown): obj is OauthResponse => {
    return Boolean(obj && typeof obj === 'object' && 'access_token' in (obj as HttpHeaders));
}

export default class OauthAuthenticator implements TapjawAuthenticator<OauthResponse> {
    private authenticated = false;
    private lastResponse: OauthResponse | null = null;

    constructor(
        protected readonly clientId: string,
        protected readonly clientSecret: string,
        protected readonly hostname: string,
        protected readonly path: string,
        protected readonly postParams: querystring.ParsedUrlQueryInput,
        protected readonly method: string = 'POST',
        protected readonly responseEncoding = 'utf8'
    ) {}

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<OauthResponse> {
        if (this.isAuthenticated()) {
            const lastResponse = this.getLastResponse();
            if (lastResponse !== null) {
                return lastResponse;
            }
        }

        const headers = {
            Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };

        const params: string = querystring.stringify(this.postParams);
        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers,
        };

        this.authenticated = false;
        this.lastResponse = null;

        const oauthResponse = await request(params, options, this.responseEncoding);
        if (!oauthResponse) {
            throw new TapjawAuthenticatorError('No oauth response was recieved.');
        }
        const oauthJson = JSON.parse(oauthResponse) as OauthResponse;

        if (!oauthJson) {
            throw new TapjawAuthenticatorError('Invalid OAuth JSON');
        }

        this.authenticated = true;
        this.lastResponse = oauthJson;

        return oauthJson;
    }

    public getLastResponse(): OauthResponse | null {
        return this.lastResponse;
    }
}
