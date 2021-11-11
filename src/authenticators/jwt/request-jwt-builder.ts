import { Algorithm } from 'jsonwebtoken';
import JWTBuilder from './jwt-builder';

export interface RequestJWTResponse {
    secret: string;
    payload: object;
}

export default abstract class RequestJWTBuilder extends JWTBuilder {
    private requestResponse?: RequestJWTResponse;

    constructor(protected readonly algorithm: Algorithm = 'HS256') {
        super(algorithm);
    }

    protected async getPayloadMetadata(): Promise<object> {
        if (!this.requestResponse) {
            this.requestResponse = await this.getRequestResponse();
        }

        return Promise.resolve(this.requestResponse.payload);
    }

    protected async getSecretKey(): Promise<string> {
        if (!this.requestResponse) {
            this.requestResponse = await this.getRequestResponse();
        }

        return Promise.resolve(this.requestResponse.secret);
    }

    protected abstract getRequestResponse(): Promise<RequestJWTResponse>;
}
