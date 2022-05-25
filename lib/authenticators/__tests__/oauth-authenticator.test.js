"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const oauth_authenticator_1 = (0, tslib_1.__importStar)(require("../oauth-authenticator"));
const request_1 = (0, tslib_1.__importDefault)(require("../support/request"));
const tapjaw_authenticator_1 = require("../../contracts/tapjaw-authenticator");
jest.mock('../support/request');
describe('Make sure the OAuthAuthenticator works as expected', () => {
    it('should return an object with an access token.', async () => {
        // @ts-ignore
        request_1.default = jest.fn(async () => {
            return Promise.resolve(JSON.stringify({ access_token: 'test-token' }));
        });
        const instance = new oauth_authenticator_1.default('test', 'test', '127.0.0.1', '/token', {});
        expect(instance.isAuthenticated()).toBeFalsy();
        expect(await instance.authenticate()).toEqual({
            access_token: 'test-token'
        });
        expect(instance.getLastResponse()).toEqual({
            access_token: 'test-token'
        });
        expect(request_1.default).toBeCalledTimes(1);
        expect(instance.isAuthenticated()).toBeTruthy();
        // Check if response has been cached by OauthAuthenticator to prevent multi-requests.
        jest.resetAllMocks();
        expect(await instance.authenticate()).toEqual({
            access_token: 'test-token'
        });
        expect(request_1.default).not.toBeCalled();
    });
    it('should correctly throw TapjawAuthenticatorError(No oauth response was recieved.)', async () => {
        // @ts-ignore
        request_1.default = jest.fn(async () => {
            return Promise.resolve(null);
        });
        const instance = new oauth_authenticator_1.default('test', 'test', '127.0.0.1', '/token', {});
        expect(instance.isAuthenticated()).toBeFalsy();
        // tslint:disable no-floating-promises
        expect(instance.authenticate()).rejects.toEqual(new tapjaw_authenticator_1.TapjawAuthenticatorError('No oauth response was recieved.'));
        expect(instance.isAuthenticated()).toBeFalsy();
    });
    it('should make sure isOauthResponse works as expected', () => {
        expect((0, oauth_authenticator_1.isOauthResponse)({})).toStrictEqual(false);
        expect((0, oauth_authenticator_1.isOauthResponse)(undefined)).toStrictEqual(false);
        expect((0, oauth_authenticator_1.isOauthResponse)(null)).toStrictEqual(false);
        expect((0, oauth_authenticator_1.isOauthResponse)({
            access_token: 'test'
        })).toStrictEqual(true);
    });
});
