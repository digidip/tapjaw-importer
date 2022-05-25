"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bearer_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../bearer-auth-authenticator"));
describe('Make sure the BearerAuthAuthenticator works as expected', () => {
    it('should return an expected header information', async () => {
        const instance = new bearer_auth_authenticator_1.default('test');
        expect(instance.isAuthenticated()).toBeFalsy();
        expect(await instance.authenticate()).toEqual({
            Authorization: 'Bearer test'
        });
        expect(instance.isAuthenticated()).toBeTruthy();
    });
});
