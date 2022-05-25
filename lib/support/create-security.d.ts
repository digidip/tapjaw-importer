/// <reference types="node" />
import TapjawAuthenticationWrapper from '../contracts/tapjaw-authentication-wrapper';
import { CustomHeaders } from '../authenticators/custom-header-authenticator';
import JWTBuilder from '../authenticators/jwt/jwt-builder';
export declare const createBasicSecurity: (username: string, password: string) => TapjawAuthenticationWrapper;
export declare const createBearerSecurity: (token: string) => TapjawAuthenticationWrapper;
export declare const createSimpleAuthorizationHeaderSecurity: (token: string) => TapjawAuthenticationWrapper;
export declare const createCustomHeaderSecurity: (name: string, value: string) => TapjawAuthenticationWrapper;
export declare const createCustomHeadersSecurity: (headers: CustomHeaders[]) => TapjawAuthenticationWrapper;
export declare const createQueryParamterPrefetchTokenSecurity: (queryParameterName: string, hostname: string, uri: string, method: string, jsonPathToToken: string, queryParameters?: Record<string, string>, headers?: Record<string, string>) => TapjawAuthenticationWrapper;
export declare const createPrefetchTokenAuthorizationHeadersSecurity: (apiKey: string, hostname: string, path: string, method: string) => TapjawAuthenticationWrapper;
export declare const createOAuthSecurity: (clientId: string, clientSecret: string, hostname: string, path: string, postParams: Record<string, string>, method?: string, responseEncoding?: BufferEncoding) => TapjawAuthenticationWrapper;
export declare const createOAuthRefreshSecurity: (clientId: string, clientSecret: string, hostname: string, path: string, postParams: Record<string, string>, method?: string, responseEncoding?: BufferEncoding) => TapjawAuthenticationWrapper;
export declare const createJWTSecurity: (jwtBuilder: JWTBuilder) => TapjawAuthenticationWrapper;
