import * as https from 'https';
import * as querystring from 'querystring';
import TapjawAuthenticator, { TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';
import TapjawConnector from '../contracts/tapjaw-connector';

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

    public async authenticate(connector: TapjawConnector): Promise<void> {
        return new Promise(async (resolve, reject) => {
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
            const oauthResponse = await this.request(params, options).catch(reject);

            if (oauthResponse) {
                this.authenticated = true;
                this.lastResponse = oauthResponse;
                connector.setAuthenticatorData(oauthResponse);
                return resolve();
            }

            reject(new TapjawAuthenticatorError('No oauth response was recieved.'));
        });
    }

    public getLastResponse(): any {
        return this.lastResponse;
    }

    private async request(params: string, options: https.RequestOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            const authReq = https.request(options, response => {
                let buffer = '';

                response.setEncoding(this.responseEncoding);

                response.on('data', (data: string) => buffer += data);
                response.on('end', () => resolve(buffer));
                response.on('error', (error: Error) => reject(error));
            });

            authReq.write(params);
            authReq.end();
        });
    }
}
