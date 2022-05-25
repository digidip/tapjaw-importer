import { RequestOptions } from "http";
import TapjawAuthenticator from "../../contracts/tapjaw-authenticator";
import { TapjawAuthenticationWrapper } from "../../contracts";
import { HttpHeaders } from "../../contracts/tapjaw-authenticator";

export default class ApplyCustomHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    constructor(private readonly authenticator: TapjawAuthenticator<HttpHeaders>) {}

    protected headers!: HttpHeaders;

    public async authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions> {
        this.headers = await this.authenticator.authenticate();

        return this.applyCustomHeader(requestOptionContainer);
    }

    private applyCustomHeader(options: RequestOptions): RequestOptions {
        options.headers = { ...options.headers, ...this.headers };

        return options;
    }
}
