import ApplyOauthAuthorizationHttpHeaderWrapper from '../apply-oauth-authorization-http-header-wrapper';
import OauthAuthenticator from '../../oauth-authenticator';

// We need to mock the OAuthAuthenticator as it attempts network communications.
jest.mock('../../oauth-authenticator');

describe('Test ApplyOauthAuthorizationHttpHeaderWrapper', () => {
    test('Make sure the "Authorization: Basic XXX" header is provided from OAuth authenticator', async () => {
        // prepare mocked Oauth authenticator
        const oauth = new OauthAuthenticator('aclient', 'asecret', '127.0.0.1', '/token', {});

        oauth.getLastResponse = jest.fn(() => null);
        oauth.authenticate = jest.fn(async () => Promise.resolve(JSON.parse('{"access_token":"Pancho"}')));
        oauth.isAuthenticated = jest.fn(() => false);

        const instance = new ApplyOauthAuthorizationHttpHeaderWrapper(oauth);

        const updatedOptions = await instance.authenticate({
            headers: {
                'Content-Type': 'application/json',
            }
        });

        expect(oauth.isAuthenticated).toBeCalledTimes(1);
        expect(oauth.authenticate).toBeCalledTimes(1);
        expect(updatedOptions).toEqual({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Pancho'
            }
        });

        // Make sure the Oauth credentials are cached in the Wrapper.
        jest.resetAllMocks();
        oauth.isAuthenticated = jest.fn(() => true);
        const updatedOptionsFromWrapper = await instance.authenticate({
            headers: {
                'Content-Type': 'application/json',
            }
        });

        expect(oauth.isAuthenticated).toBeCalledTimes(1);
        expect(oauth.authenticate).not.toBeCalled();
        expect(oauth.getLastResponse).not.toBeCalled();
        expect(updatedOptionsFromWrapper).toEqual({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Pancho'
            }
        });
    });
});
