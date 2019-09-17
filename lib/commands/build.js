"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
class Build extends command_1.Command {
    async run() {
        // @ts-ignore
        const { args, flags } = this.parse(Build);
        this.log('hi');
    }
}
exports.default = Build;
Build.description = 'Creata a new tapjaw project';
Build.examples = [
    '$ tapjaw build',
];
Build.flags = {
    help: command_1.flags.help({ char: 'h' }),
};
Build.args = [
// {
//     name: 'country',
//     default: '',
//     description: 'Filter vouchers by ISO-3122 Alpha-2 country code.'
// }
];
