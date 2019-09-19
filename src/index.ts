export { run } from '@oclif/command';

// Contracts
export { default as TapjawAdapter } from './contracts/tapjaw-adapter';
export { default as TapjawConnector } from './contracts/tapjaw-connector';
export { default as TapjawAuthenticator } from './contracts/tapjaw-authenticator';
export { default as TapjawIterator } from './contracts/tapjaw-iterator';
export { default as TapjawMessage } from './contracts/tapjaw-message';
export { default as TapjawCommand } from './contracts/tapjaw-command';

// Connectors
export { default as TapjawHttpConnector } from './connectors/tapjaw-http-connector';
// export { default as TapjawSoapConnector } from './connectors/tapjaw-soap-connector';

// Authenticators
export { default as TapjawBasicAuthenticator } from './authenticators/basic-auth-authenticator';
export { default as TapjawBearerAuthenticator } from './authenticators/bearer-auth-authenticator';
export { default as TapjawOauthAuthenticator } from './authenticators/oauth-authenticator';

export { default as TapjawApplyAuthorizationHttpHeaderWrapper } from './authenticators/wrappers/apply-authorization-http-header-wrapper';
export { default as TapjawApplyOauthAuthorizationHttpHeaderWrapper } from './authenticators/wrappers/apply-oauth-authorization-http-header-wrapper';

// Iterators
export { default as StdoutIterator } from './iterators/stdout-iterator';
export { default as OutputIterator } from './iterators/output-iterator';

// Support
export { default as sortObjectArrays } from './support/sort-object-arrays';
