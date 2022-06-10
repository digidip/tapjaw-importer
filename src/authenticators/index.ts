export {
    createBasicSecurity,
    createBearerSecurity,
    createOAuthSecurity,
    createJWTSecurity,
    createCustomHeaderSecurity,
    createCustomHeadersSecurity,
    createOAuthRefreshSecurity,
    createPrefetchTokenAuthorizationHeadersSecurity,
    createQueryParamterPrefetchTokenSecurity,
    createSimpleAuthorizationHeaderSecurity,
    createQueryStringSecurity,
} from '../support/create-security';

export { default as BasicAuthAuthenticator } from './basic-auth-authenticator';
export { default as BearerAuthAuthenticator } from './bearer-auth-authenticator';
export { default as JWTBearerAuthAuthenticator } from './jwt-bearer-auth-authenticator';
export { default as OAuthAuthenticator } from './oauth-authenticator';

// Additional authenticators
export { default as NonBearerAuthorizationAuthenticator } from './non-bearer-authorization-authenticator';
export { default as CustomHeaderAuthenticator } from './custom-header-authenticator';
export { default as PrefetchTokenAuthorizationHeaderAuthenticator } from './prefetch-token-authorization-header-authenticator';
export { default as OauthRefreshAuthenticator } from './oauth-refresh-authenticator';
export { default as PreauthUriTokenAuthenticator } from './preauth-uri-token-authenticator';

export * as JWT from './jwt';

export * as Wrappers from './wrappers';

export { default as TapjawAuthenticationWrapper } from '../contracts/tapjaw-authentication-wrapper';
