"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
class TapjawCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.defaultFlags = {
            help: command_1.flags.help({ char: 'h' }),
        };
    }
    // protected setDependency(adapter: TapjawAdapter, iterator: TapjawIterator): void {
    //     this.adapter = adapter;
    //     this.iterator = iterator;
    // }
    async run() {
        const { args, flags } = this.parse(this.instance);
        this.log('hi');
    }
}
TapjawCommand.args = [];
exports.default = TapjawCommand;
