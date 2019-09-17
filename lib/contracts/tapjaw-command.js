"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
class TapjawCommand extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(this.instance);
        await this.iterator.run(this.getAdapterCallback(args, flags), 2);
    }
}
exports.default = TapjawCommand;
TapjawCommand.args = [];
TapjawCommand.defaultFlags = {
    help: command_1.flags.help({ char: 'h' }),
};
