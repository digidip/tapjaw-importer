import BearerAuthAuthenticator, { BearerResponse } from './bearer-auth-authenticator';
export default class NonBearerAuthorizationAuthenticator extends BearerAuthAuthenticator {
    authenticate(): Promise<BearerResponse>;
}
