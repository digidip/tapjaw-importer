"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namespaceFilterToken = (configRow, tokenName) => configRow.substring(0, tokenName.length) === tokenName;
exports.default = namespaceFilterToken;
