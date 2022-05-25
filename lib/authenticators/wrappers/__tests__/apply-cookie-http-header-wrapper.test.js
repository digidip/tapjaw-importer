"use strict";
// import ApplyCookieHttpHeaderWrapper from '../apply-cookie-http-header-wrapper';
// import SessionAuthenticator from '../../session-authenticator';
// import { CookieJar } from 'tough-cookie';
// import RequestFormBuilder, { FormFieldName, FormFieldValue } from '../../support/request-form-builder';
// import HtmlFormExtractor from '../../support/html-form-extractor';
describe.skip('Test ApplyCookieHttpHeaderWrapper', () => {
    it('ignore', () => { });
});
//     jest.mock('../../session-authenticator');
//     jest.mock('../../support/request-form-builder');
//     jest.mock('../../support/html-form-extractor');
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//     test('Make sure the "Cookie: moo=test" header is provided to HTTP request options from SessionAuthenticator', async () => {
//         const instance = new ApplyCookieHttpHeaderWrapper(
//             new SessionAuthenticator(
//                 'http://url.test.com',
//                 new HtmlFormExtractor('#null', 'http://url.test.com'),
//                 new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
//                     ['test', 'test']
//                 ]))
//             ),
//             'http://url.test.com'
//         );
//         const cookies = new CookieJar();
//         cookies.setCookieSync('CAT=pancho', 'http://url.test.com/');
//         SessionAuthenticator.prototype.authenticate = jest.fn(() => Promise.resolve({
//             cookies,
//         }));
//         SessionAuthenticator.prototype.isAuthenticated = jest.fn(() => false);
//         const authMethod = jest.spyOn<SessionAuthenticator, 'authenticate'>(SessionAuthenticator.prototype, 'authenticate');
//         const isAuthMethod = jest.spyOn<SessionAuthenticator, 'isAuthenticated'>(SessionAuthenticator.prototype, 'isAuthenticated');
//         const updatedOptions = await instance.authenticate({});
//         expect(updatedOptions).toEqual({
//             headers: {
//                 Cookie: 'CAT=pancho'
//             }
//         });
//         expect(isAuthMethod).toBeCalledTimes(1);
//         expect(authMethod).toBeCalledTimes(1);
//         jest.resetAllMocks();
//         SessionAuthenticator.prototype.isAuthenticated = jest.fn(() => true);
//         const isAuthMethod1 = jest.spyOn<SessionAuthenticator, 'isAuthenticated'>(SessionAuthenticator.prototype, 'isAuthenticated');
//         const updatedOptions1 = await instance.authenticate({});
//         expect(updatedOptions1).toEqual({
//             headers: {
//                 Cookie: 'CAT=pancho'
//             }
//         });
//         expect(isAuthMethod1).toBeCalledTimes(1);
//         expect(authMethod).not.toBeCalled();
//     });
//     test('Make sure the errors are re-thrown from SessionAuthenticator', async () => {
//         jest.mock('../../session-authenticator');
//         jest.mock('../../support/request-form-builder');
//         jest.mock('../../support/html-form-extractor');
//         const instance = new ApplyCookieHttpHeaderWrapper(
//             new SessionAuthenticator(
//                 'http://url.test.com',
//                 new HtmlFormExtractor('#null', 'http://url.test.com'),
//                 new RequestFormBuilder(new Map<FormFieldName, FormFieldValue>([
//                     ['test', 'test']
//                 ]))
//             ),
//             'http://url.test.com'
//         );
//         SessionAuthenticator.prototype.isAuthenticated = jest.fn(() => false);
//         SessionAuthenticator.prototype.authenticate = jest.fn(() => Promise.reject(new Error('testing')));
//         expect(instance.authenticate({})).rejects.toEqual(new Error('testing'));
//     });
// });
