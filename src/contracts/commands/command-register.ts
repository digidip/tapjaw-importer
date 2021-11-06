import { Argument, Command } from 'commander';
import { BaseTapjawCommand, CommandAction } from '.';
import displayExample from '../../support/display-example';

export default function (this: BaseTapjawCommand, program: Command) {
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
    const action = Reflect.getMetadata('tapjaw:command:action', this) as CommandAction;

    command
        .description(String(Reflect.getMetadata('tapjaw:command:description', this)))
        .storeOptionsAsProperties(false)
        .requiredOption('-i, --import-id <importId>', 'The unique Import ID')
        .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
        .action(action.bind(this))
        .on('--help', displayExample(String(Reflect.getMetadata('tapjaw:command:example', this))));

    if (Reflect.hasMetadata('tapjaw:command:arguments', this)) {
        for (const argument of Reflect.getMetadata('tapjaw:command:arguments', this) as Argument[]) {
            command.addArgument(argument);
        }
    }
}
