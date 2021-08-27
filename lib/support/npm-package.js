"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmPackage = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const npmPackage = () => {
    return JSON.parse(fs_1.default.readFileSync(__dirname + '/../../package.json').toString());
};
exports.npmPackage = npmPackage;
