"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(obj) {
    return Boolean(obj instanceof Error || (obj && typeof obj === 'object' && 'obj' in obj && 'stack' in obj));
}
exports.default = default_1;
