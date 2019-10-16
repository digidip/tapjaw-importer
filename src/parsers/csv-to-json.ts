const csvToJsonConverter = require('csvtojson');
const camelcaseKeys = require('camelcase-keys');

type CsvObjects = {[key: string]: any} | ReadonlyArray<{[key: string]: any}>;

export default <T>(csv: string, quote = '"'): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = await csvToJsonConverter({
                quote,
                checkColumn: true,
            }).fromString(csv) as CsvObjects;

            results = camelcaseKeys(results, {
                deep: true
            });

            return resolve(results as T);
        } catch (e) {
            reject(new Error(e));
        }
    });
};
