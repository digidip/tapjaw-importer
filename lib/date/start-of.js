"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const startOf = (date, period) => luxon_1.DateTime.fromJSDate(date, {
    zone: 'UTC',
})
    .startOf(period)
    .toJSDate();
exports.default = startOf;
