"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const axios_cookiejar_support_1 = tslib_1.__importDefault(require("axios-cookiejar-support"));
const https = tslib_1.__importStar(require("https"));
const tough_cookie_1 = require("tough-cookie");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
class SessionAuthenticator {
    constructor(loginPageUrl, formExtractor, requestFormBuilder) {
        this.loginPageUrl = loginPageUrl;
        this.formExtractor = formExtractor;
        this.requestFormBuilder = requestFormBuilder;
        this.authenticated = false;
        this.cookies = this.createCookieJar();
        axios_cookiejar_support_1.default(axios_1.default);
        this.requestor = axios_1.default.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        this.defaultRequestConfig = {
            withCredentials: true,
            timeout: 10000,
            headers: {
                userAgent: 'tapjaw-login/0.2.0',
                // Minimal headers for less errors.
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-GB,en;q=0.5',
                Connection: 'keep-alive',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: (status) => (status >= 300 && status < 400) || status === 200
        };
    }
    isAuthenticated() {
        return this.authenticated;
    }
    async authenticate() {
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
                await this.requestor.request(Object.assign(Object.assign({ url: form.url, jar: this.cookies }, this.defaultRequestConfig), { method: form.method, headers: Object.assign(Object.assign({}, this.defaultRequestConfig.headers), { 'Content-Length': length }), data, maxRedirects: 25 }));
                this.authenticated = true;
                resolve({
                    cookies: this.cookies
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    setCookies(cookies) {
        const cookieJar = this.createCookieJar();
        cookies.forEach(async (cookie) => {
            cookieJar.setCookieSync(`${cookie.name}=${cookie.value}`, this.loginPageUrl);
        });
        this.cookies = cookieJar;
    }
    async getLoginForm() {
        var _a, _b;
        const browser = await puppeteer_1.default.launch({ headless: true });
        const page = await browser.newPage();
        const response = await page.goto(this.loginPageUrl, {
            waitUntil: 'networkidle2'
        });
        const bodyBuffer = await ((_a = response) === null || _a === void 0 ? void 0 : _a.buffer());
        this.setCookies(await page.cookies());
        // shut down browser
        await page.close();
        await browser.close();
        return ((_b = bodyBuffer) === null || _b === void 0 ? void 0 : _b.toString()) || false;
    }
    createCookieJar() {
        const cookieJar = new tough_cookie_1.CookieJar(undefined, {
            looseMode: true
        });
        // @ts-ignore - forcefully overload setCookie so we can provide ignoreError option.
        cookieJar.setCookie = function (cookie, url, options, cb) {
            return tough_cookie_1.CookieJar.prototype.setCookie.apply(cookieJar, 
            // @ts-ignore
            [
                cookie,
                url,
                {
                    // @ts-ignore
                    ignoreError: true
                },
                typeof options === 'function' ? options : cb
            ]);
        };
        return cookieJar;
    }
}
exports.default = SessionAuthenticator;
