"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (message) => {
    return Boolean(message &&
        typeof message === 'object' &&
        'signature' in message &&
        'sourceProviderName' in message &&
        'import_date' in message &&
        'payload' in message);
};
