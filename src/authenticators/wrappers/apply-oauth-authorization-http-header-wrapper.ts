import TapjawAuthenticator, {
    TapjawAuthenticatorError
} from "../../contracts/tapjaw-authenticator";
import * as https from "https";
import TapjawAuthenticationWrapper from "../../contracts/tapjaw-authentication-wrapper";
import { OauthResponse } from "../oauth-authenticator";

type HttpHeaders = { [key: string]: string };

export default class ApplyOauthAuthorizationHttpHeaderWrapper
    implements TapjawAuthenticationWrapper {
    protected authenticationData: HttpHeaders | undefined;

    constructor(private readonly authenticator: TapjawAuthenticator) {}

    public authenticate(
        requestOptionContainer: https.RequestOptions
    ): Promise<https.RequestOptions> {
        return new Promise(async (resolve, reject) => {
            // Has the OAuth process already run?
            if (this.authenticator.isAuthenticated()) {
                // Does the authentication data actually exist?
                if (
                    !this.authenticationData ||
                    !this.authenticationData.access_token
                ) {
                    this.authenticationData = undefined;
                    return reject(
                        new TapjawAuthenticatorError(
                            `No "access_token" property provided from authenticator: ${this
                                .authenticator.constructor.name || "Unknown"}`
                        )
                    );
                }

                // Apply and respond with cached data.
                return resolve(
                    this.applyAuthorizationHeader(
                        requestOptionContainer,
                        this.authenticationData.access_token
                    )
                );
            }

            try {
                this.authenticationData = (await this.authenticator.authenticate()) as OauthResponse;
            } catch (error) {
                return reject(error);
            }

            if (!this.authenticationData) {
                return reject(
                    new TapjawAuthenticatorError(
                        `No OAuth data recieved from authenticator: ${this
                            .authenticator.constructor.name || "Unknown"}`
                    )
                );
            }

            if (!this.authenticationData.access_token) {
                this.authenticationData = undefined;
                return reject(
                    new TapjawAuthenticatorError(
                        `No "access_token" property provided from authenticator: ${this
                            .authenticator.constructor.name || "Unknown"}`
                    )
                );
            }

            resolve(
                this.applyAuthorizationHeader(
                    requestOptionContainer,
                    this.authenticationData.access_token
                )
            );
        });
    }

    private applyAuthorizationHeader(
        options: https.RequestOptions,
        accessToken: string
    ): https.RequestOptions {
        return {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        };
    }
}
