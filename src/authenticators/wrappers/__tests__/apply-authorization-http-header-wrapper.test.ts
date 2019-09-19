import ApplyAuthorizationHttpHeaderWrapper from '../apply-authorization-http-header-wrapper';
import BasicAuthAuthenticator from '../../basic-auth-authenticator';
import BearerAuthAuthenticator from '../../bearer-auth-authenticator';

describe('Test ApplyAuthorizationHttpHeaderWrapper', () => {
    test('Make sure the "Authorization: Basic XXX" header is provided to HTTP request options from BasicAuthAuthenticator', async () => {
        const instance = new ApplyAuthorizationHttpHeaderWrapper(
            new BasicAuthAuthenticator('test', 'test')
        );

        const updatedOptions = await instance.authenticate({
            headers: {
                'Content-Type': 'application/json',
            }
        });

        expect(updatedOptions).toEqual({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic dGVzdDp0ZXN0'
            }
        });
    });

    test('Make sure the "Authorization: Bearer XXX" header is provided to HTTP request options from BearerAuthAuthenticator', async () => {
        const instance = new ApplyAuthorizationHttpHeaderWrapper(
            new BearerAuthAuthenticator('134567890xxxxx0987654321')
        );

        const updatedOptions = await instance.authenticate({
            headers: {
                'Content-Type': 'application/json',
            }
        });

        expect(updatedOptions).toEqual({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer 134567890xxxxx0987654321'
            }
        });
    });
});
