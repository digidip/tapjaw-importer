"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSegmenter = exports.dateAdd = exports.dateDiff = exports.utcDate = exports.formatDate = exports.startOf = exports.startOfDate = exports.endOf = exports.endOfDate = exports.constants = void 0;
const tslib_1 = require("tslib");
exports.constants = tslib_1.__importStar(require("./constants"));
var end_of_date_1 = require("./end-of-date");
Object.defineProperty(exports, "endOfDate", { enumerable: true, get: function () { return tslib_1.__importDefault(end_of_date_1).default; } });
var end_of_1 = require("./end-of");
Object.defineProperty(exports, "endOf", { enumerable: true, get: function () { return tslib_1.__importDefault(end_of_1).default; } });
var start_of_date_1 = require("./start-of-date");
Object.defineProperty(exports, "startOfDate", { enumerable: true, get: function () { return tslib_1.__importDefault(start_of_date_1).default; } });
var start_of_1 = require("./start-of");
Object.defineProperty(exports, "startOf", { enumerable: true, get: function () { return tslib_1.__importDefault(start_of_1).default; } });
var format_date_1 = require("./format-date");
Object.defineProperty(exports, "formatDate", { enumerable: true, get: function () { return tslib_1.__importDefault(format_date_1).default; } });
var utc_date_1 = require("./utc-date");
Object.defineProperty(exports, "utcDate", { enumerable: true, get: function () { return tslib_1.__importDefault(utc_date_1).default; } });
var date_diff_1 = require("./date-diff");
Object.defineProperty(exports, "dateDiff", { enumerable: true, get: function () { return tslib_1.__importDefault(date_diff_1).default; } });
var date_add_1 = require("./date-add");
Object.defineProperty(exports, "dateAdd", { enumerable: true, get: function () { return tslib_1.__importDefault(date_add_1).default; } });
exports.dateSegmenter = tslib_1.__importStar(require("./date-segmenter"));
// export default {
//     constants,
//     endOfDate,
//     endOf,
//     startOf,
//     startOfDate,
//     formatDate,
//     utcDate,
//     dateDiff,
//     dateAdd,
// };
