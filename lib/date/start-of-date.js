"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const startOfDate = (date) => luxon_1.DateTime.fromJSDate(date, {
    zone: 'UTC',
}).startOf('day').toJSDate();
exports.default = startOfDate;
