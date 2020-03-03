/// <reference types="node" />
import querystring from 'querystring';
import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
export declare type OauthResponse = {
    [key: string]: any;
    access_token: string;
};
export default class OauthAuthenticator implements TapjawAuthenticator {
    protected readonly clientId: string;
    protected readonly clientSecret: string;
    protected readonly hostname: string;
    protected readonly path: string;
    protected readonly postParams: querystring.ParsedUrlQueryInput;
    protected readonly method: string;
    protected readonly responseEncoding: string;
    private authenticated;
    private lastResponse;
    constructor(clientId: string, clientSecret: string, hostname: string, path: string, postParams: querystring.ParsedUrlQueryInput, method?: string, responseEncoding?: string);
    isAuthenticated(): boolean;
    authenticate(): Promise<OauthResponse>;
    getLastResponse(): OauthResponse | null;
}
