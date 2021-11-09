import { Algorithm, sign } from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { UNIX_TIMESTAMP } from '../../date/constants';

export default abstract class JWTTokenGenerator {
    constructor(protected readonly algorithm: Algorithm = 'HS256') {}

    public async getToken(): Promise<string> {
        return sign(
            {
                // sub: authenticator.userUid,
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

    protected abstract getPayloadMetadata(): Promise<object>;
    protected abstract getSecretKey(): Promise<string>;
}
