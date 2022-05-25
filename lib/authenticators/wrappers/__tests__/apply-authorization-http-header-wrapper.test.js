"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apply_authorization_http_header_wrapper_1 = (0, tslib_1.__importDefault)(require("../apply-authorization-http-header-wrapper"));
const basic_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../../basic-auth-authenticator"));
const bearer_auth_authenticator_1 = (0, tslib_1.__importDefault)(require("../../bearer-auth-authenticator"));
describe('Test ApplyAuthorizationHttpHeaderWrapper', () => {
    test('Make sure the "Authorization: Basic XXX" header is provided to HTTP request options from BasicAuthAuthenticator', async () => {
        const instance = new apply_authorization_http_header_wrapper_1.default(new basic_auth_authenticator_1.default('test', 'test'));
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
        const instance = new apply_authorization_http_header_wrapper_1.default(new bearer_auth_authenticator_1.default('134567890xxxxx0987654321'));
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
