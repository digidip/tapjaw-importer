import { Algorithm } from 'jsonwebtoken';
import JWTBuilder from './jwt-builder';

export default class ManualJWTBuilder extends JWTBuilder {
    constructor(
        private readonly secret: string,
        private readonly payload: Record<string, unknown>,
        protected readonly algorithm: Algorithm = 'HS256'
    ) {
        super(algorithm);
    }

    protected async getPayloadMetadata(): Promise<Record<string, unknown>> {
        return Promise.resolve(this.payload);
    }

    protected async getSecretKey(): Promise<string> {
        return Promise.resolve(this.secret);
    }
}
