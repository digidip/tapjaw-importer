import TapjawAuthenticator from '../contracts/tapjaw-authenticator';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import https from 'https';
import { CookieJar } from 'tough-cookie';
import HtmlFormExtractor from './support/html-form-extractor';
import RequestFormBuilder from './support/request-form-builder';
import { launch, Cookie } from 'puppeteer';
import { npmPackage } from '../support/npm-package';

export default class SessionAuthenticator implements TapjawAuthenticator {
    private authenticated = false;
    private readonly requestor: AxiosInstance;
    private readonly defaultRequestConfig: AxiosRequestConfig;
    private cookies: CookieJar = this.createCookieJar();

    constructor(
        protected readonly loginPageUrl: string,
        protected readonly formExtractor: HtmlFormExtractor,
        protected readonly requestFormBuilder: RequestFormBuilder
    ) {
        axiosCookieJarSupport(axios);

        this.requestor = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        this.defaultRequestConfig = {
            withCredentials: true,
            timeout: 10000,
            headers: {
                userAgent: `tapjaw-login/${npmPackage().version}`,

                // Minimal headers for less errors.
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-GB,en;q=0.5',
                Connection: 'keep-alive',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: (status: number) => (status >= 300 && status < 400) || status === 200,
            maxRedirects: 25
        };
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async authenticate(): Promise<{ cookies: CookieJar }> {
        return new Promise(async (resolve, reject) => {
            try {
                const body = await this.getLoginForm();

                if (!body) {
                    return reject(new Error('No response from login url'));
                }

                const form = this.formExtractor.getInputFields(body);
                if (!form) {
                    return reject(new Error('No form found in response'));
                }

                if (form.url === false) {
                    return reject(new Error(`Could not find login URL from form: ${this.loginPageUrl}`));
                }

                // generate form fields
                const { data, length } = this.requestFormBuilder.build(form);
                await this.requestor.request({
                    url: form.url,
                    jar: this.cookies,
                    ...this.defaultRequestConfig,
                    method: form.method,
                    headers: {
                        ...this.defaultRequestConfig.headers,
                        'Content-Length': length
                    },
                    data,
                });

                this.authenticated = true;
                resolve({
                    cookies: this.cookies
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    protected setCookies(cookies: Cookie[]): void {
        const cookieJar = this.createCookieJar();
        cookies.forEach(async cookie => {
            cookieJar.setCookieSync(`${cookie.name}=${cookie.value}`, this.loginPageUrl);
        });
        this.cookies = cookieJar;
    }

    protected async getLoginForm(): Promise<string | false> {
        const browser = await launch({ headless: true });
        const page = await browser.newPage();
        const response = await page.goto(this.loginPageUrl, {
            waitUntil: 'networkidle2'
        });
        const bodyBuffer = await response?.buffer();
        this.setCookies(await page.cookies());

        // shut down browser
        await page.close();
        await browser.close();

        return bodyBuffer?.toString() || false;
    }

    protected createCookieJar(): CookieJar {
        const cookieJar = new CookieJar(undefined, {
            looseMode: true
        });

        // @ts-ignore - forcefully overload setCookie so we can provide ignoreError option.
        cookieJar.setCookie = function (cookie, url, options, cb) {
            return CookieJar.prototype.setCookie.apply(
                cookieJar,
                // @ts-ignore
                [
                    cookie,
                    url,
                    {
                        // @ts-ignore
                        ignoreError: true
                    },
                    typeof options === 'function' ? options : cb
                ]
            );
        };

        return cookieJar;
    }
}
