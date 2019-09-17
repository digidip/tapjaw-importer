export default (payload: { [key: string]: any; }): object => {
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

    return newPayload;
}
