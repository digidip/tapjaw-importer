import { Algorithm, sign } from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { UNIX_TIMESTAMP } from '../../date/constants';

export default abstract class JWTBuilder {
    constructor(protected readonly algorithm: Algorithm = 'HS256') {}

    public async getToken(): Promise<string> {
        return sign(
            {
                ...(await this.getPayloadMetadata()),
                iat: Number(DateTime.now().toFormat(UNIX_TIMESTAMP)),
            },
            await this.getSecretKey(),
            {
                algorithm: this.algorithm,
                header: {
                    alg: this.algorithm,
                },
            }
        );
    }

    protected abstract getPayloadMetadata(): Promise<Record<string, unknown>>;
    protected abstract getSecretKey(): Promise<string>;
}
