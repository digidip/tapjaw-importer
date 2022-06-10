"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const end_of_1 = tslib_1.__importDefault(require("./end-of"));
function endOfDate(date) {
    return (0, end_of_1.default)(date, 'day');
}
exports.default = endOfDate;
