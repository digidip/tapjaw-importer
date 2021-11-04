"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const formatDate = (date, format) => luxon_1.DateTime.fromJSDate(date, {
    zone: 'UTC',
}).toFormat(format);
exports.default = formatDate;
