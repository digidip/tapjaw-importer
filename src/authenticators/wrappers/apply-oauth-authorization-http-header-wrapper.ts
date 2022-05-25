import TapjawAuthenticator, { TapjawAuthenticatorError } from '../../contracts/tapjaw-authenticator';
import https from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { isOauthResponse, OauthResponse } from '../oauth-authenticator';

export default class ApplyOauthAuthorizationHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    protected authenticationData?: OauthResponse;

    constructor(private readonly authenticator: TapjawAuthenticator<OauthResponse>) {}

    public async authenticate(requestOptionContainer: https.RequestOptions): Promise<https.RequestOptions> {
        // Has the OAuth process already run?
        if (this.authenticator.isAuthenticated()) {
            // Does the authentication data actually exist?
            if (!isOauthResponse(this.authenticationData)) {
                this.authenticationData = undefined;
                throw new TapjawAuthenticatorError(
                    `No "access_token" property provided from authenticator: ${
                        this.authenticator.constructor.name || 'Unknown'
                    }`
                );
            }

            // Apply and respond with cached data.
            return this.applyAuthorizationHeader(requestOptionContainer, this.authenticationData.access_token);
        }

        this.authenticationData = await this.authenticator.authenticate();
        if (!this.authenticationData) {
            throw new TapjawAuthenticatorError(
                `No OAuth data recieved from authenticator: ${this.authenticator.constructor.name || 'Unknown'}`
            );
        }

        if (!this.authenticationData.access_token) {
            this.authenticationData = undefined;
            throw new TapjawAuthenticatorError(
                `No "access_token" property provided from authenticator: ${
                    this.authenticator.constructor.name || 'Unknown'
                }`
            );
        }

        return this.applyAuthorizationHeader(requestOptionContainer, this.authenticationData.access_token);
    }

    private applyAuthorizationHeader(options: https.RequestOptions, accessToken: string): https.RequestOptions {
        return {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        };
    }
}
