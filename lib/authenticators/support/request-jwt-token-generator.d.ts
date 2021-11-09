import { Algorithm } from 'jsonwebtoken';
import JWTTokenGenerator from './jwt-token-generator';
export interface RequestJWTResponse {
    secret: string;
    payload: object;
}
export default abstract class RequestJWTTokenGenerator extends JWTTokenGenerator {
    protected readonly algorithm: Algorithm;
    private requestResponse?;
    constructor(algorithm?: Algorithm);
    protected getPayloadMetadata(): Promise<object>;
    protected getSecretKey(): Promise<string>;
    protected abstract getRequestResponse(): Promise<RequestJWTResponse>;
}
