/// <reference types="node" />
import TapjawAuthenticationWrapper from '../contracts/tapjaw-authentication-wrapper';
import querystring from 'querystring';
export declare const createBasicSecurity: (username: string, password: string) => TapjawAuthenticationWrapper;
export declare const createBearerSecurity: (token: string) => TapjawAuthenticationWrapper;
export declare const createOAuthSecurity: (clientId: string, clientSecret: string, hostname: string, path: string, postParams: querystring.ParsedUrlQueryInput, method?: string, responseEncoding?: BufferEncoding) => TapjawAuthenticationWrapper;
