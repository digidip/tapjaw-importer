import BearerAuthAuthenticator, { BearerResponse } from "./bearer-auth-authenticator";

export default class NonBearerAuthorizationAuthenticator extends BearerAuthAuthenticator {
    public async authenticate(): Promise<BearerResponse> {
        const headers = await super.authenticate();
        headers.Authorization = headers.Authorization.replace("Bearer ", "");
        return Promise.resolve(headers);
    }
}
