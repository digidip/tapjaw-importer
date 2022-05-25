import TapjawAuthenticator, { TapjawAuthenticatorError } from '../contracts/tapjaw-authenticator';
import request from './support/request';
import jsonpath from 'jsonpath';

export type URIToken = string;

export default class PreauthUriTokenAuthenticator implements TapjawAuthenticator<URIToken> {
    private token!: string;

    constructor(
        protected readonly hostname: string,
        protected readonly path: string,
        protected readonly method: string = 'GET',
        protected readonly tokenJsonPath: string,
        protected readonly params = {},
        protected readonly headers = {}
    ) {}

    isAuthenticated(): boolean {
        return Boolean(this.token);
    }

    public async authenticate(): Promise<URIToken> {
        const headers = {
            ...this.headers
        };

        const params: string = new URLSearchParams({
            ...this.params
        }).toString();

        const options = {
            hostname: this.hostname,
            path: this.path,
            method: this.method,
            headers
        };

        if (this.method === 'GET') {
            options.path = `${options.path}?${params}`;
        }

        const response = await request(this.method === 'POST' ? params : '', options);
        if (!response) {
            throw new TapjawAuthenticatorError('No token response was recieved.');
        }
        const json = JSON.parse(response) as { data: { token: string } };
        const data = jsonpath.query(json, this.tokenJsonPath);
        if (data.length !== 1) {
            throw new TapjawAuthenticatorError(
                `Could not extract token with JSONPath (${this.tokenJsonPath}) from response: ${response}`
            );
        }

        this.token = data[0] as string;
        return this.token;
    }
}
