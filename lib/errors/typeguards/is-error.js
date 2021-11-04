"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (obj) => {
    return Boolean(obj instanceof Error || (obj && typeof obj === 'object' && 'obj' in obj && 'stack' in obj));
};
