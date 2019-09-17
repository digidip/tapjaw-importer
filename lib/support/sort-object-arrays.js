"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (payload) => {
    const keys = Object.keys(payload);
    const newPayload = {};
    keys.forEach((key) => {
        if (Array.isArray(payload[key]) && payload[key].length > 0) {
            const arrayToSort = payload[key];
            if (typeof arrayToSort[0] === 'object') {
                // objects containing data.
                newPayload[key] = arrayToSort.sort((a, b) => {
                    const aJson = JSON.stringify(a);
                    const bJson = JSON.stringify(b);
                    if (aJson === bJson) {
                        return 0;
                    }
                    return aJson > bJson ? 1 : -1;
                });
            }
            else {
                // strings / numbers
                newPayload[key] = arrayToSort.sort();
            }
        }
        else {
            newPayload[key] = payload[key];
        }
    });
    return newPayload;
};
