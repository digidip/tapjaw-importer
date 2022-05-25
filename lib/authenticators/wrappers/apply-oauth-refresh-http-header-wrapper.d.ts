import OauthRefreshAuthenticator from "../oauth-refresh-authenticator";
import ApplyOauthAuthorizationHttpHeaderWrapper from "./apply-oauth-authorization-http-header-wrapper";
export default class ApplyOAuthRefreshHttpHeaderWrapper extends ApplyOauthAuthorizationHttpHeaderWrapper {
    private readonly refreshAthenticator;
    constructor(refreshAthenticator: OauthRefreshAuthenticator);
    refreshToken(): Promise<void>;
}
