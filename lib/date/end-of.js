"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const endOf = (date, period) => luxon_1.DateTime.fromJSDate(date, {
    zone: 'UTC',
})
    .endOf(period)
    .toJSDate();
exports.default = endOf;
