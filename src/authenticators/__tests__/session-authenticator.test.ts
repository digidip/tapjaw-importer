import SessionAuthenticator from '../session-authenticator';
import RequestFormBuilder, { FormFieldName, FormFieldValue } from '../support/request-form-builder';
import HtmlFormExtractor, { Form } from '../support/html-form-extractor';
import axios, { AxiosRequestConfig } from 'axios';
import puppeteer, { Browser, Page, Response, Cookie } from 'puppeteer';
import { CookieJar } from 'tough-cookie';

describe('Make sure SessionAuthenticator works as expected', () => {
    jest.mock('../support/request-form-builder');
    jest.mock('../support/html-form-extractor');
    jest.genMockFromModule('axios');
    jest.genMockFromModule('puppeteer');

    const puppeteerLaunchMock = (body: string, cookies: Cookie[] = []) => (): Promise<jest.Mocked<Browser>> => {
        const response = {
            buffer: jest.fn(() => Promise.resolve(Buffer.from(body))),
        } as jest.Mocked<Pick<Response, 'buffer'>>

        const page = {
            goto: jest.fn((url: string, options?) => Promise.resolve(response as jest.Mocked<Response | null>)),
            close: jest.fn(() => Promise.resolve()),
            cookies: jest.fn(() => Promise.resolve(cookies)),
        } as jest.Mocked<Pick<Page, 'goto' | 'close' | 'cookies'>>;

        const browser = {
            newPage: jest.fn((): Promise<Page> => {
                return Promise.resolve(page as jest.Mocked<Page>);
            }),
            close: jest.fn(() => Promise.resolve()),
        } as jest.Mocked<Pick<Browser, 'newPage' | 'close'>>;


        return Promise.resolve(browser as jest.Mocked<Browser>);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should have an initial state as not authenticated', () => {
        const instance = new SessionAuthenticator(
            'http://url.test.com',
            new HtmlFormExtractor('#null', 'http://url.test.com'),
            new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
                ['test', 'test']
            ]))
        );

        expect(instance.isAuthenticated()).toEqual(false);
    });

    test('should get a "No response from login url" error', async () => {
        const instance = new SessionAuthenticator(
            'http://url.test.com',
            new HtmlFormExtractor('#null', 'http://url.test.com'),
            new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
                ['test', 'test']
            ]))
        );

        puppeteer.launch = jest.fn(puppeteerLaunchMock(''));
        await expect(instance.authenticate()).rejects.toEqual(new Error('No response from login url'));
    });

    test('should get a "No form found in response" error', async () => {
        const extractor = new HtmlFormExtractor('#null', 'http://url.test.com');
        const instance = new SessionAuthenticator(
            'http://url.test.com',
            extractor,
            new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
                ['test', 'test']
            ]))
        );

        puppeteer.launch = jest.fn(puppeteerLaunchMock('<html><body></body></html>'));
        extractor.getInputFields = jest.fn(() => null);

        await expect(instance.authenticate()).rejects.toEqual(new Error('No form found in response'));
        expect(extractor.getInputFields).toBeCalledWith('<html><body></body></html>');
        expect(extractor.getInputFields).toBeCalledTimes(1);
    });

    test('should get a "Could not find login URL from form: http://url.test.com" error', async () => {
        const extractor = new HtmlFormExtractor('#myform', 'http://url.test.com');
        const instance = new SessionAuthenticator(
            'http://url.test.com',
            extractor,
            new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
                ['test', 'test']
            ]))
        );

        puppeteer.launch = jest.fn(puppeteerLaunchMock('<html><body><form id="myform" method="post"><input name="test" type="text" value=""/></form></body></html>'));
        extractor.getInputFields = jest.fn((body: string) => ({
            url: false
        } as Form));

        await expect(instance.authenticate()).rejects.toEqual(new Error('Could not find login URL from form: http://url.test.com'));
        expect(extractor.getInputFields).toBeCalledWith('<html><body><form id="myform" method="post"><input name="test" type="text" value=""/></form></body></html>');
        expect(extractor.getInputFields).toBeCalledTimes(1);
    });

    test('should return cookies and authenticated should be true', async () => {
        const extractor = new HtmlFormExtractor('#myform', 'http://url.test.com');
        const builder = new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
            ['test', 'test']
        ]));
        const instance = new SessionAuthenticator(
            'http://url.test.com',
            extractor,
            builder
        );

        const html = `'<html>
    <body>
        <form id="myform" action="http://url.test.com/login" method="post">
            <input name="test" type="text" value=""/>
            <input name="test1" type="text" value="value1"/>
            <input name="test2" type="password" value="value2"/>
        </form>
    </body>
</html>'`;
        const cookies: Cookie[] = [
            {
                name: 'MOO',
                value: 'cat',
                domain: 'na',
                path: 'na',
                expires: 0,
                size: 10,
                httpOnly: false,
                session: false,
                secure: false,
                sameSite: 'Lax',
            }
        ]
        puppeteer.launch = jest.fn(puppeteerLaunchMock(html, cookies));
        // @ts-ignore - not sure how to masquerade <T = any, R = AxiosResponse<T>>
        axios.request = jest.fn(
            (config: AxiosRequestConfig) => {
                return Promise.resolve({ data: {} });
            }
        );

        const getInputFieldsSpy = jest.spyOn(extractor, 'getInputFields');
        const buildSpy = jest.spyOn(builder, 'build');

        const expectedCookieJar = new CookieJar();
        const cookieDate = new Date();
        expectedCookieJar.setCookieSync('MOO=cat', 'http://url.test.com', { now: cookieDate });

        const response = await instance.authenticate();
        expect(response.cookies).toBeDefined();

        const expectedCookies = response.cookies.toJSON();
        expectedCookies.cookies = expectedCookies.cookies.map(cookie => ({
            ...cookie,
            creation: cookieDate.toISOString(), // need to align dates
            lastAccessed: cookieDate.toISOString(), // need to align dates
        }));

        expect(expectedCookies.cookies).toEqual(expectedCookieJar.toJSON().cookies);
        expect(getInputFieldsSpy).toBeCalledWith(html);
        expect(getInputFieldsSpy).toBeCalledTimes(1);
        expect(buildSpy).toBeCalledWith({
            url: 'http://url.test.com/login',
            method: 'post',
            inputs: [
                {
                    name: 'test',
                    value: '',
                    type: "text"
                },
                {
                    name: 'test1',
                    value: 'value1',
                    type: "text"
                },
                {
                    name: 'test2',
                    value: 'value2',
                    type: "password"
                },
            ]
        } as Form);
        expect(buildSpy).toBeCalledTimes(1);
        expect(instance.isAuthenticated()).toEqual(true);
    });
});
