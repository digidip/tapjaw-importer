import BasicAuthAuthenticator from '../basic-auth-authenticator';

describe('Make sure the BasicAuthAuthenticator works as expected', () => {
    it('should return an expected header information', async () => {
        const instance = new BasicAuthAuthenticator('test', 'test');

        expect(instance.isAuthenticated()).toBeFalsy();
        expect(await instance.authenticate()).toEqual({
            Authorization: 'Basic dGVzdDp0ZXN0'
        });
        expect(instance.isAuthenticated()).toBeTruthy();
    });
});
