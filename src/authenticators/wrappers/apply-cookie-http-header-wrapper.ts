import https from 'https';
import TapjawAuthenticationWrapper from '../../contracts/tapjaw-authentication-wrapper';
import { CookieJar } from 'tough-cookie';
import SessionAuthenticator from '../session-authenticator';

export default class ApplyCookieHttpHeaderWrapper implements TapjawAuthenticationWrapper {
    protected cookies = new CookieJar();

    constructor(private readonly authenticator: SessionAuthenticator, private readonly host: string) {}

    public authenticate(requestOptionContainer: https.RequestOptions): Promise<https.RequestOptions> {
        return new Promise(async (resolve, reject) => {
            if (!this.authenticator.isAuthenticated()) {
                try {
                    this.cookies = (await this.authenticator.authenticate()).cookies;
                } catch (error) {
                    return reject(error);
                }
            }

            resolve(this.applyCookiesToHeader(requestOptionContainer));
        });
    }

    private applyCookiesToHeader(options: https.RequestOptions): https.RequestOptions {
        return {
            ...options,
            headers: {
                ...options.headers,
                Cookie: this.cookies.getCookieStringSync(this.host)
            }
        };
    }
}
