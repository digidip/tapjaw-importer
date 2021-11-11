"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = exports.isTapjawMessage = void 0;
var is_tapjaw_message_1 = require("./is-tapjaw-message");
Object.defineProperty(exports, "isTapjawMessage", { enumerable: true, get: function () { return __importDefault(is_tapjaw_message_1).default; } });
var is_error_1 = require("./is-error");
Object.defineProperty(exports, "isError", { enumerable: true, get: function () { return __importDefault(is_error_1).default; } });
