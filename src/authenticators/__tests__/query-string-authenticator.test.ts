import { TapjawAuthenticatorError } from '../../contracts/tapjaw-authenticator';
import QueryStringAuthenticator from '../query-string-authenticator';

describe('Make sure the QueryStringAuthenticator works as expected', () => {
    it('should return the configured query parameters', async () => {
        const queryParameters = {
            arg1: 'value1',
            arg2: 'value2',
        };
        const instance = new QueryStringAuthenticator(queryParameters);
        expect(instance.isAuthenticated()).toBeTruthy();
        await expect(instance.authenticate()).resolves.toEqual(queryParameters);
    });

    it('should recieved not authenticated when no parameters are provided', async () => {
        const queryParameters = {};
        const instance = new QueryStringAuthenticator(queryParameters);
        expect(instance.isAuthenticated()).toBeFalsy();
        await expect(() => instance.authenticate()).rejects.toThrowError(
            new TapjawAuthenticatorError('No QueryParameters provided to authenticator')
        );
    });
});
