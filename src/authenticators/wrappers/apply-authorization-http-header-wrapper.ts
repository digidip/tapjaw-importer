import TapjawAuthenticator, {
    AuthorizationHeaders,
    TapjawAuthenticatorError,
} from '../../contracts/tapjaw-authenticator';
import { RequestOptions } from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';

export default class ApplyAuthorizationHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    protected authenticationData?: AuthorizationHeaders;

    constructor(private readonly authenticator: TapjawAuthenticator<AuthorizationHeaders>) {}

    public async authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions> {
        if (this.authenticator.isAuthenticated()) {
            // Apply Authorization header.
            return this.applyAuthorizationHeader(requestOptionContainer);
        }

        // Generate the Authorization token.
        this.authenticationData = await this.authenticator.authenticate();
        if (typeof this.authenticationData !== 'object') {
            throw new TapjawAuthenticatorError(
                `No Authorization header data recieved from authenticator: ${
                    this.authenticator.constructor.name || 'Unknown'
                }`
            );
        }

        return this.applyAuthorizationHeader(requestOptionContainer);
    }

    private applyAuthorizationHeader(options: RequestOptions): RequestOptions {
        return {
            ...options,
            headers: {
                ...options.headers,
                ...this.authenticationData,
            },
        };
    }
}
