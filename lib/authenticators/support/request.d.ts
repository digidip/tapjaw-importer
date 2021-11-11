/// <reference types="node" />
import { RequestOptions } from 'https';
/**
 * Wraps and performs a HTTP/HTTPS request.
 *
 * @todo Move into global support to make it more reusable and abstract away the
 *       HTTP/HTTPS node library from existing code.
 *
 * @param params string
 * @param options https.RequestOptions
 * @param responseEncoding string
 * @reutrn Promise<T>
 */
declare const request: <T extends string>(params: string, options: RequestOptions, responseEncoding?: BufferEncoding) => Promise<T>;
export default request;
