import { Argument, Command } from 'commander';
import { BaseTapjawCommand, CommandAction, CommandOption } from '../contracts/commands';
import displayExample from '../support/display-example';

export default function (this: BaseTapjawCommand, program: Command): Command {
    if (!Reflect.hasMetadata('tapjaw:command:name', this)) {
        throw new Error(
            `@TapjawMetadata.Command.Name(string) is required!
TapjawMetadata loading is enabled, please overload "public async ${this.constructor.name}.register(...)"
to manually configure the command.`
        );
    }
    if (!Reflect.hasMetadata('tapjaw:command:description', this)) {
        throw new Error(
            `@TapjawMetadata.Command.Description(string) is required!
TapjawMetadata loading is enabled, please overload "public async ${this.constructor.name}.register(...)"
to manually configure the command.`
        );
    }
    if (!Reflect.hasMetadata('tapjaw:command:action', this)) {
        throw new Error(
            `@TapjawMetadata.Command.Action(CommandAction) is required!
TapjawMetadata loading is enabled, please overload "async ${this.constructor.name}.register(...)"
to manually configure the command.`
        );
    }

    const command = program.command(String(Reflect.getMetadata('tapjaw:command:name', this)));
    const action = Reflect.getMetadata('tapjaw:command:action', this) as CommandAction;

    command
        .description(String(Reflect.getMetadata('tapjaw:command:description', this)))
        .storeOptionsAsProperties(false)
        .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
        .action(action.bind(this))
        .on('--help', displayExample(String(Reflect.getMetadata('tapjaw:command:example', this))));

    if (Reflect.hasMetadata('tapjaw:command:arguments', this)) {
        for (const argument of Reflect.getMetadata('tapjaw:command:arguments', this) as Argument[]) {
            command.addArgument(argument);
        }
    }

    if (Reflect.hasMetadata('tapjaw:command:options', this)) {
        for (const { required, flags, description, defaultValue } of Reflect.getMetadata(
            'tapjaw:command:options',
            this
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
