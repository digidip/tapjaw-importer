import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
import { CookieJar } from 'tough-cookie';
import HtmlFormExtractor from './support/html-form-extractor';
import RequestFormBuilder from './support/request-form-builder';
import puppeteer from 'puppeteer';
export default class SessionAuthenticator implements TapjawAuthenticator {
    protected readonly loginPageUrl: string;
    protected readonly formExtractor: HtmlFormExtractor;
    protected readonly requestFormBuilder: RequestFormBuilder;
    private authenticated;
    private requestor;
    private defaultRequestConfig;
    private cookies;
    constructor(loginPageUrl: string, formExtractor: HtmlFormExtractor, requestFormBuilder: RequestFormBuilder);
    isAuthenticated(): boolean;
    authenticate(): Promise<{
        cookies: CookieJar;
    }>;
    protected setCookies(cookies: puppeteer.Cookie[]): void;
    protected getLoginForm(): Promise<string | false>;
    protected createCookieJar(): CookieJar;
}
