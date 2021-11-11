"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = exports.TapjawConfigError = exports.TapjawConnectorError = exports.TapjawAdapterError = void 0;
var tapjaw_adapter_error_1 = require("./tapjaw-adapter-error");
Object.defineProperty(exports, "TapjawAdapterError", { enumerable: true, get: function () { return __importDefault(tapjaw_adapter_error_1).default; } });
var tapjaw_connector_error_1 = require("./tapjaw-connector-error");
Object.defineProperty(exports, "TapjawConnectorError", { enumerable: true, get: function () { return __importDefault(tapjaw_connector_error_1).default; } });
var tapjaw_config_error_1 = require("./tapjaw-config-error");
Object.defineProperty(exports, "TapjawConfigError", { enumerable: true, get: function () { return __importDefault(tapjaw_config_error_1).default; } });
var is_error_1 = require("./typeguards/is-error");
Object.defineProperty(exports, "isError", { enumerable: true, get: function () { return __importDefault(is_error_1).default; } });
