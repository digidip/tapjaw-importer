"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
exports.npmPackage = () => {
    return JSON.parse(fs.readFileSync(__dirname + '/../../package.json').toString());
};
