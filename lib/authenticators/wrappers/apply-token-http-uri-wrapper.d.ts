/// <reference types="node" />
import { RequestOptions } from "https";
import TapjawAuthenticator from "../../contracts/tapjaw-authenticator";
import { TapjawAuthenticationWrapper } from "../../contracts";
import { URIToken } from "../preauth-uri-token-authenticator";
export default class ApplyTokenHttpUriWrapper implements TapjawAuthenticationWrapper {
    private readonly uriParameterName;
    private readonly authenticator;
    protected token: URIToken;
    constructor(uriParameterName: string, authenticator: TapjawAuthenticator<URIToken>);
    authenticate(requestOptionContainer: RequestOptions): Promise<RequestOptions>;
    private applyTokenToURI;
}
