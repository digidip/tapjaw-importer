"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
function endOf(date, period) {
    return luxon_1.DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .endOf(period)
        .toJSDate();
}
exports.default = endOf;
