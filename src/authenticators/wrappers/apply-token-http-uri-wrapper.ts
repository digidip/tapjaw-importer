import { RequestOptions } from 'https';
import TapjawAuthenticator, { TapjawAuthenticatorError } from '../../contracts/tapjaw-authenticator';
import { TapjawAuthenticationWrapper } from '../../contracts';
import { URIToken } from '../preauth-uri-token-authenticator';

export default class ApplyTokenHttpUriWrapper implements TapjawAuthenticationWrapper {
    protected token!: URIToken;

    constructor(
        private readonly uriParameterName: string,
        private readonly authenticator: TapjawAuthenticator<URIToken>
    ) {}

    public async authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions> {
        if (this.authenticator.isAuthenticated()) {
            // Apply Authorization header.
            return this.applyTokenToURI(requestOptionContainer);
        }

        // Generate the Authorization token.
        this.token = await this.authenticator.authenticate();
        if (typeof this.token !== 'string') {
            throw new TapjawAuthenticatorError(
                `No Authorization token recieved from authenticator: ${
                    this.authenticator.constructor.name || 'Unknown'
                }`
            );
        }

        return this.applyTokenToURI(requestOptionContainer);
    }

    private applyTokenToURI(options: RequestOptions): RequestOptions {
        if (!options.path) {
            throw new TapjawAuthenticatorError(
                `No path available in RequestOptions: ${this.authenticator.constructor.name || 'Unknown'}`
            );
        }
        const path = new URL(`https://www.digidip.com/${options.path}`);
        path.searchParams.set(this.uriParameterName, this.token);
        options.path = `${path.pathname}?${path.searchParams.toString()}`;

        return options;
    }
}
