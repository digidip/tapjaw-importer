import csvToJsonConverter from 'csvtojson';
import camelcaseKeys from 'camelcase-keys';

type CsvObjects = Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;

export default async function csvToJson<T>(csv: string, quote = '"', delimiter = ','): Promise<T> {
    const service = csvToJsonConverter({
        quote,
        delimiter,
        checkColumn: true,
    });

    const results = (await service.fromString(csv)) as CsvObjects;
    if (results.length === 0) {
        return results as T;
    }

    return camelcaseKeys(results, {
        deep: true,
    }) as T;
}
