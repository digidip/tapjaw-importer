"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = exports.TapjawConfigError = exports.ConnectorError = exports.AdapterError = void 0;
var adapter_error_1 = require("./adapter-error");
Object.defineProperty(exports, "AdapterError", { enumerable: true, get: function () { return __importDefault(adapter_error_1).default; } });
var connector_error_1 = require("./connector-error");
Object.defineProperty(exports, "ConnectorError", { enumerable: true, get: function () { return __importDefault(connector_error_1).default; } });
var tapjaw_config_error_1 = require("./tapjaw-config-error");
Object.defineProperty(exports, "TapjawConfigError", { enumerable: true, get: function () { return __importDefault(tapjaw_config_error_1).default; } });
var is_error_1 = require("./typeguards/is-error");
Object.defineProperty(exports, "isError", { enumerable: true, get: function () { return __importDefault(is_error_1).default; } });
