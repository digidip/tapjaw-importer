"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const dateAdd = (dateA, value, period) => {
    return luxon_1.DateTime.fromJSDate(dateA)
        .plus({
        [period]: value,
    })
        .toJSDate();
};
exports.default = dateAdd;
