import TapjawAuthenticator, {
    TapjawAuthenticatorError
} from "../../contracts/tapjaw-authenticator";
import * as https from "https";
import TapjawAuthenticationWrapper from "../../contracts/tapjaw-authentication-wrapper";

type HttpHeaders = { [key: string]: string };

export default class ApplyAuthorizationHttpHeaderWrapper
    implements TapjawAuthenticationWrapper {
    protected authenticationData: HttpHeaders | undefined;

    constructor(private readonly authenticator: TapjawAuthenticator) {}

    public authenticate(
        requestOptionContainer: https.RequestOptions
    ): Promise<https.RequestOptions> {
        return new Promise(async (resolve, reject) => {
            if (this.authenticator.isAuthenticated()) {
                // Apply Authorization header.
                return resolve(
                    this.applyAuthorizationHeader(requestOptionContainer)
                );
            }

            // Generate the Authorization token.
            this.authenticationData = (await this.authenticator
                .authenticate()
                .catch(reject)) as HttpHeaders;

            if (!this.authenticationData) {
                return reject(
                    new TapjawAuthenticatorError(
                        `No Authorization header data recieved from authenticator: ${this
                            .authenticator.constructor.name || "Unknown"}`
                    )
                );
            }

            resolve(this.applyAuthorizationHeader(requestOptionContainer));
        });
    }

    private applyAuthorizationHeader(
        options: https.RequestOptions
    ): https.RequestOptions {
        return {
            ...options,
            headers: {
                ...options.headers,
                ...this.authenticationData
            }
        };
    }
}
