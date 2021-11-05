"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dot_env_config_1 = (0, tslib_1.__importDefault)(require("./dot-env-config"));
class TapjawConfig extends dot_env_config_1.default {
    constructor() {
        super('Default Tapjaw Config', 'TAPJAW_');
    }
}
exports.default = new TapjawConfig();
