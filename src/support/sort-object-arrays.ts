/**
 * @ignore
 */
const sortObjectsCallback = (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const aJson = JSON.stringify(a);
    const bJson = JSON.stringify(b);

    if (aJson === bJson) {
        return 0;
    }

    return aJson > bJson ? 1 : -1;
};

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
 * @param payload Payload
 */
export default function sortObjectArrays<T = Record<string, unknown>>(payload: Record<string, unknown>): T {
    const keys = Object.keys(payload);
    const newPayload: Record<string, unknown> = {};

    keys.forEach((key: string) => {
        const prop = payload[key];

        if (Array.isArray(prop) && prop.length > 0) {
            prop.forEach((value: unknown, index: number) => {
                if (value && typeof value === 'object' && !Array.isArray(value) && value !== null) {
                    // recurse into child objects
                    prop[index] = sortObjectArrays<T>(value as Record<string, unknown>);
                }
            });

            if (typeof prop[0] === 'object') {
                // first item in the array is an object!
                newPayload[key] = prop.sort(sortObjectsCallback);
            } else {
                // strings / numbers
                newPayload[key] = prop.sort();
            }
        } else {
            newPayload[key] = payload[key];
        }
    });

    return newPayload as T;
}
