"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const display_example_1 = (0, tslib_1.__importDefault)(require("../support/display-example"));
function default_1(program) {
    if (!Reflect.hasMetadata('tapjaw:command:name', this)) {
        throw new Error('@TapjawCommand.Name(string) not found.');
    }
    if (!Reflect.hasMetadata('tapjaw:command:description', this)) {
        throw new Error('@TapjawCommand.Description(string) not found.');
    }
    if (!Reflect.hasMetadata('tapjaw:command:action', this)) {
        throw new Error('@TapjawCommand.Action(CommandAction) not found.');
    }
    const command = program.command(String(Reflect.getMetadata('tapjaw:command:name', this)));
    const action = Reflect.getMetadata('tapjaw:command:action', this);
    command
        .description(String(Reflect.getMetadata('tapjaw:command:description', this)))
        .storeOptionsAsProperties(false)
        .requiredOption('-i, --import-id <importId>', 'The unique Import ID')
        .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
        .action(action.bind(this))
        .on('--help', (0, display_example_1.default)(String(Reflect.getMetadata('tapjaw:command:example', this))));
    if (Reflect.hasMetadata('tapjaw:command:arguments', this)) {
        for (const argument of Reflect.getMetadata('tapjaw:command:arguments', this)) {
            command.addArgument(argument);
        }
    }
    if (Reflect.hasMetadata('tapjaw:command:options', this)) {
        for (const { required, flags, description, defaultValue } of Reflect.getMetadata('tapjaw:command:options', this)) {
            if (required) {
                command.requiredOption(flags, description, defaultValue);
            }
            else {
                command.option(flags, description, defaultValue);
            }
        }
    }
}
exports.default = default_1;
