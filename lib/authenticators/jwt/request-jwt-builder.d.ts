import { Algorithm } from 'jsonwebtoken';
import JWTBuilder from './jwt-builder';
export interface RequestJWTResponse {
    secret: string;
    payload: Record<string, unknown>;
}
export default abstract class RequestJWTBuilder extends JWTBuilder {
    protected readonly algorithm: Algorithm;
    private requestResponse?;
    constructor(algorithm?: Algorithm);
    protected getPayloadMetadata(): Promise<Record<string, unknown>>;
    protected getSecretKey(): Promise<string>;
    protected abstract getRequestResponse(): Promise<RequestJWTResponse>;
}
