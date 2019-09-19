/**
 * This support method is used to prevent TapjawMessage
 * signatures incorrectly changing between API responses.
 *
 * If a API payload contains properties which are arrays, in some
 * cases an API will provide the array in a different order between
 * requests which affects the signature of the TapjawMessage.
 *
 * This function supports arrays containing objects or any scalar types.
 *
 * @param payload { [key: string]: any; }
 */
export default <T = object>(payload: { [key: string]: any; }): T => {
    const keys = Object.keys(payload);
    const newPayload: { [key: string]: any; } = {};

    keys.forEach((key: string) => {
        if (Array.isArray(payload[key]) && payload[key].length > 0) {
            const arrayToSort = payload[key];
            if (typeof arrayToSort[0] === 'object') {
                // objects containing data.
                newPayload[key] = arrayToSort.sort((a: any, b: any) => {
                    const aJson = JSON.stringify(a);
                    const bJson = JSON.stringify(b);

                    if (aJson === bJson) {
                        return 0;
                    }

                    return aJson > bJson ? 1 : -1;
                });
            } else {
                // strings / numbers
                newPayload[key] = arrayToSort.sort();
            }
        } else {
            newPayload[key] = payload[key];
        }
    });

    return newPayload as T;
}
