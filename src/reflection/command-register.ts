import { Argument, Command } from 'commander';
import { TapjawCommand, CommandAction, CommandOption } from '../commands';
import displayExample from '../support/display-example';

export default function (this: TapjawCommand & { prototype?: object }, program: Command): Command {
    if (!this.prototype) {
        throw new Error(`${this.constructor.name}.prototype missing.`);
    }

    if (!Reflect.hasMetadata('tapjaw:command:name', this.prototype, 'class')) {
        throw new Error(
            `@TapjawMetadata.Command.Name(string) is required!
TapjawMetadata loading is enabled, please overload "public async ${this.constructor.name}.register(...)"
to manually configure the command.`
        );
    }
    if (!Reflect.hasMetadata('tapjaw:command:description', this.prototype, 'class')) {
        throw new Error(
            `@TapjawMetadata.Command.Description(string) is required!
TapjawMetadata loading is enabled, please overload "public async ${this.constructor.name}.register(...)"
to manually configure the command.`
        );
    }
    if (!Reflect.hasMetadata('tapjaw:command:action', this.prototype, 'class')) {
        throw new Error(
            `@TapjawMetadata.Command.Action(CommandAction) is required!
TapjawMetadata loading is enabled, please overload "async ${this.constructor.name}.register(...)"
to manually configure the command.`
        );
    }

    const command = program.command(String(Reflect.getMetadata('tapjaw:command:name', this.prototype, 'class')));
    const action = Reflect.getMetadata('tapjaw:command:action', this.prototype, 'class') as CommandAction;

    command
        .description(String(Reflect.getMetadata('tapjaw:command:description', this.prototype, 'class')))
        .storeOptionsAsProperties(false)
        .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
        .action(action.bind(this))
        .on('--help', displayExample(String(Reflect.getMetadata('tapjaw:command:example', this.prototype, 'class'))));

    if (Reflect.hasMetadata('tapjaw:command:arguments', this.prototype, 'class')) {
        for (const argument of Reflect.getMetadata('tapjaw:command:arguments', this.prototype, 'class') as Argument[]) {
            command.addArgument(argument);
        }
    }

    if (Reflect.hasMetadata('tapjaw:command:options', this.prototype, 'class')) {
        for (const { required, flags, description, defaultValue } of Reflect.getMetadata(
            'tapjaw:command:options',
            this.prototype,
            'class'
        ) as CommandOption[]) {
            if (required) {
                command.requiredOption(flags, description, defaultValue);
            } else {
                command.option(flags, description, defaultValue);
            }
        }
    }

    return command;
}
