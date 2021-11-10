"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
function dateDiff(now, past, period) {
    return luxon_1.DateTime.fromJSDate(now).diff(luxon_1.DateTime.fromJSDate(past), period);
}
exports.default = dateDiff;
