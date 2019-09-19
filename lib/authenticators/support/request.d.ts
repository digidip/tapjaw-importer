/// <reference types="node" />
import * as https from 'https';
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
declare const request: (params: string, options: https.RequestOptions, responseEncoding?: string) => Promise<any>;
export default request;
