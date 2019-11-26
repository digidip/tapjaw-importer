import * as querystring from 'querystring';
import TapjawAuthenticator, { TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';
import request from './support/request';

export type OauthResponse = {
    [key: string]: any;
    access_token: string;
};

export default class OauthAuthenticator implements TapjawAuthenticator {
    private authenticated = false;
    private lastResponse: any | null;

    constructor(
        protected readonly clientId: string,
        protected readonly clientSecret: string,
        protected readonly hostname: string,
        protected readonly path: string,
        protected readonly postParams: querystring.ParsedUrlQueryInput,
        protected readonly method: string = 'POST',
        protected readonly responseEncoding = 'utf8',
    ) { }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<OauthResponse> {
        return new Promise(async (resolve, reject) => {
            if (this.isAuthenticated() && this.getLastResponse()) {
                return resolve(JSON.parse(this.getLastResponse()) as OauthResponse);
            }

            const headers: object = {
                Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            };

            const params: string = querystring.stringify(this.postParams);
            const options: object = {
                hostname: this.hostname,
                path: this.path,
                method: this.method,
                headers,
            };

            this.authenticated = false;
            this.lastResponse = null;
            try {
                const oauthResponse = await request(params, options, this.responseEncoding);

                if (oauthResponse) {
                    this.authenticated = true;
                    this.lastResponse = oauthResponse;

                    return resolve(JSON.parse(oauthResponse) as OauthResponse);
                }
            } catch (error) {
                reject(error);
            }

            reject(new TapjawAuthenticatorError('No oauth response was recieved.'));
        });
    }

    public getLastResponse(): any {
        return this.lastResponse;
    }
}
