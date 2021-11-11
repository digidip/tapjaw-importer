"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
function default_1(date, period) {
    return luxon_1.DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .startOf(period)
        .toJSDate();
}
exports.default = default_1;
