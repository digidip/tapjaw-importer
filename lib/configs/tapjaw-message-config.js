"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dot_env_config_1 = tslib_1.__importDefault(require("./dot-env-config"));
class TapjawMessageConfig extends dot_env_config_1.default {
    constructor() {
        super('Tapjaw Message Config', 'TAPJAW_MESSAGE_');
    }
}
exports.default = new TapjawMessageConfig();
