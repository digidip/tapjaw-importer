import { Algorithm } from 'jsonwebtoken';
import JWTTokenGenerator from './jwt-token-generator';
export default class ManualJWTTokenGenerator extends JWTTokenGenerator {
    private readonly secret;
    private readonly payload;
    protected readonly algorithm: Algorithm;
    constructor(secret: string, payload: Record<string, unknown>, algorithm?: Algorithm);
    protected getPayloadMetadata(): Promise<object>;
    protected getSecretKey(): Promise<string>;
}
