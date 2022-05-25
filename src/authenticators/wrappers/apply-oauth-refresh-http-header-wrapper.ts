import OauthRefreshAuthenticator from '../oauth-refresh-authenticator';
import ApplyOauthAuthorizationHttpHeaderWrapper from './apply-oauth-authorization-http-header-wrapper';

export default class ApplyOAuthRefreshHttpHeaderWrapper extends ApplyOauthAuthorizationHttpHeaderWrapper {
    constructor(private readonly refreshAthenticator: OauthRefreshAuthenticator) {
        super(refreshAthenticator);
    }

    public async refreshToken() {
        const oauthResponse = await this.refreshAthenticator.refreshToken();

        if (this.authenticationData) {
            this.authenticationData.access_token = oauthResponse.access_token;
        }
    }
}
