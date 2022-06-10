import { TapjawAuthenticatorError } from '../../../contracts/tapjaw-authenticator';
import QueryStringAuthenticator from '../../query-string-authenticator';
import ApplyQueryStringWrapper from '../apply-query-string-wrapper';

describe('Test ApplyQueryStringWrapper', () => {
    test('Make sure the URL path has the credential query parameters appended', async () => {
        // prepare mocked Oauth authenticator
        const queryParameters = {
            arg1: 'value1',
            arg2: 'value2',
        };
        const authenticator = new QueryStringAuthenticator(queryParameters);
        const wrapper = new ApplyQueryStringWrapper(authenticator);

        await expect(
            wrapper.authenticate({
                path: '/get?paramA=valueA',
            })
        ).resolves.toEqual({
            path: '/get?paramA=valueA&arg1=value1&arg2=value2',
        });
    });

    test('Make sure errors are thrown when inputs are not correct', async () => {
        // prepare mocked Oauth authenticator
        const queryParameters = {};
        const authenticator = new QueryStringAuthenticator(queryParameters);
        const wrapper = new ApplyQueryStringWrapper(authenticator);

        await expect(() => wrapper.authenticate({})).rejects.toThrowError(
            new TapjawAuthenticatorError(`No path available in RequestOptions: QueryStringAuthenticator`)
        );

        await expect(() => wrapper.authenticate({ path: '/get' })).rejects.toThrowError(
            new TapjawAuthenticatorError('No QueryParameters provided to authenticator')
        );
    });
});
