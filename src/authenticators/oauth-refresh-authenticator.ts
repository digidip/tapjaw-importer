import request from './support/request';
import TapjawAuthenticator, { HttpHeaders, TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';

export declare type OauthRefreshResponse = HttpHeaders &
    Record<'access_token', string> &
    Record<'refresh_token', string>;

export default class OauthRefreshAuthenticator implements TapjawAuthenticator<OauthRefreshResponse> {
    private authenticated = false;
    private lastResponse: OauthRefreshResponse | null = null;

    constructor(
        protected readonly clientId: string,
        protected readonly clientSecret: string,
        protected readonly hostname: string,
        protected readonly path: string,
        protected readonly postParams: Record<string, string>,
        protected readonly method: string = 'POST',
        protected readonly responseEncoding: BufferEncoding = 'utf8'
    ) {}

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<OauthRefreshResponse> {
        if (this.isAuthenticated()) {
            const lastResponse = this.getLastResponse();
            if (lastResponse !== null) {
                return lastResponse;
            }
        }

        const headers = {
            Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

        // @todo migrate to URLSearchParams in future.
        const params: string = new URLSearchParams(this.postParams).toString();
        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers
        };

        this.authenticated = false;
        this.lastResponse = null;

        const oauthResponse = await request(params, options, this.responseEncoding);
        if (!oauthResponse) {
            throw new TapjawAuthenticatorError('No oauth response was recieved.');
        }
        const oauthJson = JSON.parse(oauthResponse) as OauthRefreshResponse;

        if (!oauthJson) {
            throw new TapjawAuthenticatorError('Invalid OAuth JSON');
        }

        this.authenticated = true;
        this.lastResponse = oauthJson;

        return oauthJson;
    }

    public getLastResponse(): OauthRefreshResponse | null {
        return this.lastResponse;
    }

    async refreshToken(): Promise<OauthRefreshResponse> {
        if (!this.isAuthenticated()) {
            await this.authenticate();
            const lastResponse = this.getLastResponse();
            if (lastResponse !== null) {
                return lastResponse;
            }
        }

        const headers = {
            Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

        if (this.lastResponse === null || !('refresh_token' in this.lastResponse)) {
            throw new TapjawAuthenticatorError(
                'lastResponse.refresh_token not available, cannot perform OAuth refresh.'
            );
        }

        const params: string = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: this.lastResponse.refresh_token
        }).toString();

        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers
        };

        this.authenticated = false;
        this.lastResponse = null;

        const oauthResponse = await request(params, options, this.responseEncoding);
        if (!oauthResponse) {
            throw new TapjawAuthenticatorError('No oauth response was recieved.');
        }
        const oauthJson = JSON.parse(oauthResponse) as OauthRefreshResponse;

        if (!oauthJson) {
            throw new TapjawAuthenticatorError('Invalid OAuth JSON');
        }

        this.authenticated = true;
        this.lastResponse = oauthJson;

        return oauthJson;
    }
}
