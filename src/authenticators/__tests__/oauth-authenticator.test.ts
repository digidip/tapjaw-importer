import OauthAuthenticator, { isOauthResponse } from '../oauth-authenticator';
import request from '../support/request';
import { TapjawAuthenticatorError } from '../../contracts/tapjaw-authenticator';

jest.mock('../support/request');

describe('Make sure the OAuthAuthenticator works as expected', () => {
    it('should return an object with an access token.', async () => {
        // @ts-ignore
        request = jest.fn(async () => {
            return Promise.resolve(
                JSON.stringify({ access_token: 'test-token' })
            );
        });

        const instance = new OauthAuthenticator(
            'test',
            'test',
            '127.0.0.1',
            '/token',
            {}
        );
        expect(instance.isAuthenticated()).toBeFalsy();
        expect(await instance.authenticate()).toEqual({
            access_token: 'test-token'
        });
        expect(instance.getLastResponse()).toEqual({
            access_token: 'test-token'
        });
        expect(request).toBeCalledTimes(1);
        expect(instance.isAuthenticated()).toBeTruthy();

        // Check if response has been cached by OauthAuthenticator to prevent multi-requests.
        jest.resetAllMocks();
        expect(await instance.authenticate()).toEqual({
            access_token: 'test-token'
        });
        expect(request).not.toBeCalled();
    });

    it('should correctly throw TapjawAuthenticatorError(No oauth response was recieved.)', async () => {
        // @ts-ignore
        request = jest.fn(async () => {
            return Promise.resolve(null);
        });

        const instance = new OauthAuthenticator(
            'test',
            'test',
            '127.0.0.1',
            '/token',
            {}
        );
        expect(instance.isAuthenticated()).toBeFalsy();
        // tslint:disable no-floating-promises
        expect(instance.authenticate()).rejects.toEqual(
            new TapjawAuthenticatorError('No oauth response was recieved.')
        );
        expect(instance.isAuthenticated()).toBeFalsy();
    });

    it('should make sure isOauthResponse works as expected', () => {
        expect(isOauthResponse({})).toStrictEqual(false);
        expect(isOauthResponse(undefined)).toStrictEqual(false);
        expect(isOauthResponse(null)).toStrictEqual(false);
        expect(isOauthResponse({
            access_token: 'test'
        })).toStrictEqual(true);
    });
});
