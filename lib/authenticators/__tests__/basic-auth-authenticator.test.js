"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const basic_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../basic-auth-authenticator"));
describe('Make sure the BasicAuthAuthenticator works as expected', () => {
    it('should return an expected header information', async () => {
        const instance = new basic_auth_authenticator_1.default('test', 'test');
        expect(instance.isAuthenticated()).toBeFalsy();
        expect(await instance.authenticate()).toEqual({
            Authorization: 'Basic dGVzdDp0ZXN0'
        });
        expect(instance.isAuthenticated()).toBeTruthy();
    });
});
