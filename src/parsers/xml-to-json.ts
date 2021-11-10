import { parseStringPromise } from 'xml2js';
import camelcaseKeys from 'camelcase-keys';

export default async function xmlToJson<T>(xml: string): Promise<T> {
    const result = (await parseStringPromise(xml, {
        trim: true,
        explicitArray: false,
        attrkey: 'attributes',
    })) as Record<string, unknown>;

    return camelcaseKeys(result, {
        deep: true,
    }) as T;
}
