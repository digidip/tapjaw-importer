import { Algorithm } from 'jsonwebtoken';
import JWTTokenGenerator from './jwt-token-generator';

export default class ManualJWTTokenGenerator extends JWTTokenGenerator {
    constructor(
        private readonly secret: string,
        private readonly payload: Record<string, unknown>,
        protected readonly algorithm: Algorithm = 'HS256'
    ) {
        super(algorithm);
    }

    protected async getPayloadMetadata(): Promise<object> {
        return Promise.resolve(this.payload);
    }

    protected async getSecretKey(): Promise<string> {
        return Promise.resolve(this.secret);
    }
}
