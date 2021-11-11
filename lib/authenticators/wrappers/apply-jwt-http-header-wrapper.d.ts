import JWTBuilder from '../jwt/jwt-builder';
import ApplyAuthorizationHttpHeaderWrapper from './apply-authorization-http-header-wrapper';
export default class ApplyJwtHttpHeaderWrapper extends ApplyAuthorizationHttpHeaderWrapper {
    constructor(jwtGenerator: JWTBuilder);
}
