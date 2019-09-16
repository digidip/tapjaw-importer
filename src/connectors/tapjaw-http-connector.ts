import { ClientRequest, IncomingMessage } from 'http';
import * as https from 'https';
import { encode, decode, encodingExists } from 'iconv-lite';
import * as querystring from 'querystring';
import * as zlib from 'zlib';
import * as _ from 'lodash';

import TapjawConnector, { TapjawConnectorResponse, TapjawConnectorError } from '../contracts/tapjaw-connector';
import TapjawAuthentication from '../contracts/tapjaw-authentication';

export interface TapjawHttpHeaders {
    [key: string]: string | undefined;

    Accept?: string;
    'Accept-Encoding'?: string;
    Cookie?: string;
    'User-Agent'?: string;
}

export interface TapjawHttpQueryParameters {
    [key: string]: string;
}

export default abstract class TapjawHttpConnector implements TapjawConnector {
    abstract enableGzip: boolean;
    abstract useDecoding?: string;
    abstract useEncoding?: string;

    public constructor(protected readonly host: string, protected readonly security?: TapjawAuthentication) { }

    public setDecoding(encoding: string | null) {
        if (!encoding) {
            delete this.useEncoding;
        }

        if (encodingExists(encoding as string)) {
            throw new TapjawConnectorError(`Unsupported decoding: ${encoding}`);
        }

        this.useDecoding = encoding as string;
    }

    public setEncoding(encoding: string | null) {
        if (!encoding) {
            delete this.useEncoding;
        }

        if (!encodingExists(encoding as string)) {
            throw new TapjawConnectorError(`Unsupported encoding: ${encoding}`);
        }

        this.useEncoding = encoding as string;
    }

    public async get(uri: string, query: TapjawHttpQueryParameters, headers: TapjawHttpHeaders): Promise<TapjawConnectorResponse> {
        const options: https.RequestOptions = {
            hostname: this.host,
            path: `${uri}?${querystring.stringify(query)}`,
            method: 'GET',
            headers
        };

        return new Promise((resolve, reject) => {
            const connectorRequest = https.request(
                options,
                (response: IncomingMessage) => this.responseHandler(resolve, reject, response)
            );

            connectorRequest.end();
        })
    }

    private responseHandler(resolve: (args?: any) => void, reject: (args?: any) => void, response: IncomingMessage) {
        if (response.statusCode !== 200) {
            const error = new TapjawConnectorError(`HTTP Status code was ${response.statusCode}.`);
            // error.statusCode = response.statusCode;
            reject(error);
        }

        let buffer: Buffer[] = [];
        response.on('data', (data: string) => {
            buffer.push(Buffer.from(data, 'binary'));
        });

        response.on('end', async () => {
            // this.logger.debug(`${this.connectorLabel}, responded with API payload.`);
            let contentBuffer = Buffer.concat(buffer);

            if (!contentBuffer) {
                reject(new TapjawConnectorError('Empty content buffer'));
            }

            if (this.enableGzip) {
                contentBuffer = zlib.gunzipSync(contentBuffer);
            }

            if (this.useDecoding) {
                contentBuffer = Buffer.from(decode(contentBuffer, this.useDecoding));
            }

            // return raw string buffer.
            resolve(
                this.useEncoding
                    ? encode(contentBuffer.toString(), this.useEncoding).toString()
                    : contentBuffer.toString()
            );
        });

        response.on('error', reject);
    }
}
