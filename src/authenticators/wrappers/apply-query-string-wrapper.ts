import { RequestOptions } from 'https';
import { TapjawAuthenticatorError } from '../../contracts/tapjaw-authenticator';
import { TapjawAuthenticationWrapper } from '../../contracts';
import QueryStringAuthenticator from '../query-string-authenticator';

export default class ApplyQueryStringWrapper implements TapjawAuthenticationWrapper {
    constructor(private readonly authenticator: QueryStringAuthenticator) {}

    public async authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions> {
        return Promise.resolve(this.applyAuthParametersToPath(requestOptionContainer));
    }

    private async applyAuthParametersToPath(options: RequestOptions): Promise<RequestOptions> {
        if (!options.path) {
            throw new TapjawAuthenticatorError(
                `No path available in RequestOptions: ${this.authenticator.constructor.name || 'Unknown'}`
            );
        }
        const path = new URL(`https://www.digidip.com${options.path}`);

        const queryParameters = await this.authenticator.authenticate();
        for (const [name, value] of Object.entries(queryParameters)) {
            path.searchParams.set(name, value);
        }

        options.path = `${path.pathname}?${path.searchParams.toString()}`;

        return options;
    }
}
