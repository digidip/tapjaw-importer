import { Algorithm } from 'jsonwebtoken';
import JWTBuilder from './jwt-builder';
export interface RequestJWTResponse {
    secret: string;
    payload: object;
}
export default abstract class RequestJWTBuilder extends JWTBuilder {
    protected readonly algorithm: Algorithm;
    private requestResponse?;
    constructor(algorithm?: Algorithm);
    protected getPayloadMetadata(): Promise<object>;
    protected getSecretKey(): Promise<string>;
    protected abstract getRequestResponse(): Promise<RequestJWTResponse>;
}
