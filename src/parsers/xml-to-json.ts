import { parseString as parseXml } from 'xml2js';
const camelcaseKeys = require('camelcase-keys');

export default async <T>(xml: string): Promise<T> => {
    return new Promise((resolve, reject) => {
        parseXml(
            xml,
            {
                trim: true,
                explicitArray: false,
                attrkey: 'attributes'
            },
            (err: Error, result: any) => {
                if (err) {
                    return reject(err);
                }

                result = camelcaseKeys(result, {
                    deep: true
                });

                resolve(result as T);
            }
        );
    });
};
