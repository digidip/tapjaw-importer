import { Algorithm } from 'jsonwebtoken';
import JWTBuilder from './jwt-builder';
export default class ManualJWTBuilder extends JWTBuilder {
    private readonly secret;
    private readonly payload;
    protected readonly algorithm: Algorithm;
    constructor(secret: string, payload: Record<string, unknown>, algorithm?: Algorithm);
    protected getPayloadMetadata(): Promise<Record<string, unknown>>;
    protected getSecretKey(): Promise<string>;
}
