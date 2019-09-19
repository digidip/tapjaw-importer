import BearerAuthAuthenticator from '../bearer-auth-authenticator';

describe('Make sure the BearerAuthAuthenticator works as expected', () => {
    it('should return an expected header information', async () => {
        const instance = new BearerAuthAuthenticator('test');

        expect(instance.isAuthenticated()).toBeFalsy();
        expect(await instance.authenticate()).toEqual({
            Authorization: 'Bearer test'
        });
        expect(instance.isAuthenticated()).toBeTruthy();
    });
});
