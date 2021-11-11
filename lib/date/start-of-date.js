"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
function startOfDate(date) {
    return luxon_1.DateTime.fromJSDate(date, {
        zone: 'UTC',
    })
        .startOf('day')
        .toJSDate();
}
exports.default = startOfDate;
