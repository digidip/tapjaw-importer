import TapjawAuthenticator, { HttpHeaders } from '../contracts/tapjaw-authenticator';

export type CustomHeaders = [string, string];

export default class CustomHeaderAuthenticator implements TapjawAuthenticator<HttpHeaders> {
    private headers: Record<string, string>;

    constructor(headers: CustomHeaders[]) {
        this.headers = {};
        for (const [name, value] of headers) {
            this.headers[name] = value;
        }
    }

    isAuthenticated(): boolean {
        return true;
    }

    public async authenticate(): Promise<HttpHeaders> {
        return Promise.resolve(this.headers);
    }
}
