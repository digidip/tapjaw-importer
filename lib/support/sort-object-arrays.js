"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortObjectsCallback = (a, b) => {
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
function sortObjectArrays(payload) {
    const keys = Object.keys(payload);
    const newPayload = {};
    keys.forEach((key) => {
        const prop = payload[key];
        if (Array.isArray(prop) && prop.length > 0) {
            prop.forEach((value, index) => {
                if (typeof value === 'object') {
                    // recurse into child objects
                    prop[index] = sortObjectArrays(value);
                }
            });
            if (typeof prop[0] === 'object') {
                // first item in the array is an object!
                newPayload[key] = prop.sort(sortObjectsCallback);
            }
            else {
                // strings / numbers
                newPayload[key] = prop.sort();
            }
        }
        else {
            newPayload[key] = payload[key];
        }
    });
    return newPayload;
}
exports.default = sortObjectArrays;
