"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
exports.npmPackage = () => {
    return JSON.parse(fs_1.default.readFileSync(__dirname + '/../../package.json').toString());
};
