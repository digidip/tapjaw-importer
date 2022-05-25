import TapjawAuthenticationWrapper from "../contracts/tapjaw-authentication-wrapper";
import { default as TapjawApplyAuthorizationHttpHeaderWrapper } from "../authenticators/wrappers/apply-authorization-http-header-wrapper";
import { default as TapjawApplyOauthAuthorizationHttpHeaderWrapper } from "../authenticators/wrappers/apply-oauth-authorization-http-header-wrapper";
import { default as ApplyCustomHttpHeaderWrapper } from "../authenticators/wrappers/apply-custom-http-header-wrapper";
import { default as TapjawBasicAuthenticator } from "../authenticators/basic-auth-authenticator";
import { default as TapjawBearerAuthenticator } from "../authenticators/bearer-auth-authenticator";
import { default as TapjawNonBearerAuthenticator } from "../authenticators/non-bearer-authorization-authenticator";
import {
    CustomHeaders,
    default as TapjawCustomHeaderAuthenticator
} from "../authenticators/custom-header-authenticator";
import { default as TapjawOauthAuthenticator } from "../authenticators/oauth-authenticator";
import ApplyJwtHttpHeaderWrapper from "../authenticators/wrappers/apply-jwt-http-header-wrapper";
import JWTBuilder from "../authenticators/jwt/jwt-builder";
import { default as TapjawApplyOAuthRefreshHttpHeaderWrapper } from "../authenticators/wrappers/apply-oauth-refresh-http-header-wrapper";
import { default as TapjawOauthRefreshAuthenticator } from "../authenticators/oauth-refresh-authenticator";
import { default as TapjawPrefetchTokenAuthorizationHeaderAuthenticator } from "../authenticators/prefetch-token-authorization-header-authenticator";
import { ApplyTokenHttpUriWrapper } from "../authenticators/wrappers";
import { PreauthUriTokenAuthenticator } from "../authenticators";

export const createBasicSecurity = (username: string, password: string): TapjawAuthenticationWrapper =>
    new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawBasicAuthenticator(username, password));

export const createBearerSecurity = (token: string): TapjawAuthenticationWrapper =>
    new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawBearerAuthenticator(token));

export const createSimpleAuthorizationHeaderSecurity = (token: string): TapjawAuthenticationWrapper =>
    new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawNonBearerAuthenticator(token));

export const createCustomHeaderSecurity = (name: string, value: string): TapjawAuthenticationWrapper =>
    new ApplyCustomHttpHeaderWrapper(new TapjawCustomHeaderAuthenticator([[name, value]]));

export const createCustomHeadersSecurity = (headers: CustomHeaders[]): TapjawAuthenticationWrapper =>
    new ApplyCustomHttpHeaderWrapper(new TapjawCustomHeaderAuthenticator(headers));

export const createQueryParamterPrefetchTokenSecurity = (
    queryParameterName: string,
    hostname: string,
    uri: string,
    method: string,
    jsonPathToToken: string,
    queryParameters: Record<string, string> = {},
    headers: Record<string, string> = {}
): TapjawAuthenticationWrapper =>
    new ApplyTokenHttpUriWrapper(
        queryParameterName,
        new PreauthUriTokenAuthenticator(hostname, uri, method, jsonPathToToken, queryParameters, headers)
    );

export const createPrefetchTokenAuthorizationHeadersSecurity = (
    apiKey: string,
    hostname: string,
    path: string,
    method: string
): TapjawAuthenticationWrapper =>
    new TapjawApplyAuthorizationHttpHeaderWrapper(
        new TapjawPrefetchTokenAuthorizationHeaderAuthenticator(apiKey, hostname, path, method)
    );

export const createOAuthSecurity = (
    clientId: string,
    clientSecret: string,
    hostname: string,
    path: string,
    postParams: Record<string, string>,
    method = "POST",
    responseEncoding: BufferEncoding = "utf8"
): TapjawAuthenticationWrapper =>
    new TapjawApplyOauthAuthorizationHttpHeaderWrapper(
        new TapjawOauthAuthenticator(clientId, clientSecret, hostname, path, postParams, method, responseEncoding)
    );

export const createOAuthRefreshSecurity = (
    clientId: string,
    clientSecret: string,
    hostname: string,
    path: string,
    postParams: Record<string, string>,
    method = "POST",
    responseEncoding: BufferEncoding = "utf8"
): TapjawAuthenticationWrapper =>
    new TapjawApplyOAuthRefreshHttpHeaderWrapper(
        new TapjawOauthRefreshAuthenticator(
            clientId,
            clientSecret,
            hostname,
            path,
            postParams,
            method,
            responseEncoding
        )
    );

export const createJWTSecurity = (jwtBuilder: JWTBuilder): TapjawAuthenticationWrapper => {
    return new ApplyJwtHttpHeaderWrapper(jwtBuilder);
};

// const createSessionSecurity = (
//     loginPageUrl: string,
//     formSelector: string,
//     fillables: Map<FormFieldName, FormFieldValue>
// ) =>
//     new TpajawApplyCookieHttpHeaderWrapper(
//         new TapjawSessionAuthenticator(
//             loginPageUrl,
//             new TapjawHtmlFormExtractor(formSelector, loginPageUrl),
//             new TapjawRequestFormBuilder(fillables)
//         ),
//         loginPageUrl
//     );
