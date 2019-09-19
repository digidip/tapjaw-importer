import * as https from 'https';
import { IncomingMessage } from 'http';

/**
 * Wraps and performs a HTTP/HTTPS request.
 *
 * @todo Move into global support to make it more reusable and abstract away the HTTP/HTTPS node library from existing code.
 *
 * @param params string
 * @param options https.RequestOptions
 * @param responseEncoding string
 * @reutrn Promise<any>
 */
const request = (params: string, options: https.RequestOptions, responseEncoding = 'utf8'): Promise<any> => {
    return new Promise((resolve, reject) => {
        const authReq = https.request(options, (response: IncomingMessage) => {
            if (response.statusCode !== 200) {
                const error = new Error(`HTTP Status code was ${response.statusCode}.`);
                return reject(error);
            }

            let buffer = '';
            response.setEncoding(responseEncoding);
            response.on('data', (data: string) => buffer += data);
            response.on('end', () => resolve(buffer));
            response.on('error', (error: Error) => reject(error));
        });

        authReq.write(params);
        authReq.end();
    });
};

export default request;
