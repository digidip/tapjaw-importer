import TapjawAuthenticationWrapper from '../contracts/tapjaw-authentication-wrapper';
import { default as TapjawApplyAuthorizationHttpHeaderWrapper } from '../authenticators/wrappers/apply-authorization-http-header-wrapper';
import { default as TapjawApplyOauthAuthorizationHttpHeaderWrapper } from '../authenticators/wrappers/apply-oauth-authorization-http-header-wrapper';
import { default as TapjawBasicAuthenticator } from '../authenticators/basic-auth-authenticator';
import { default as TapjawBearerAuthenticator } from '../authenticators/bearer-auth-authenticator';
import { default as TapjawOauthAuthenticator } from '../authenticators/oauth-authenticator';
import querystring from 'querystring';
import ApplyJwtHttpHeaderWrapper from '../authenticators/wrappers/apply-jwt-http-header-wrapper';
import JWTBuilder from '../authenticators/jwt/jwt-builder';

export const createBasicSecurity = (username: string, password: string): TapjawAuthenticationWrapper =>
    new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawBasicAuthenticator(username, password));

export const createBearerSecurity = (token: string): TapjawAuthenticationWrapper =>
    new TapjawApplyAuthorizationHttpHeaderWrapper(new TapjawBearerAuthenticator(token));

export const createOAuthSecurity = (
    clientId: string,
    clientSecret: string,
    hostname: string,
    path: string,
    postParams: querystring.ParsedUrlQueryInput,
    method = 'POST',
    responseEncoding: BufferEncoding = 'utf8'
): TapjawAuthenticationWrapper =>
    new TapjawApplyOauthAuthorizationHttpHeaderWrapper(
        new TapjawOauthAuthenticator(clientId, clientSecret, hostname, path, postParams, method, responseEncoding)
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
