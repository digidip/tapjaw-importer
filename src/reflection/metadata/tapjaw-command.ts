import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/commands/base-tapjaw-command';

export default {
    Name: (type: string) => {
        return Reflect.metadata('tapjaw:command:name', type);
    },
    Description: (type: string) => {
        return Reflect.metadata('tapjaw:command:description', type);
    },
    Example: (type: string) => {
        return Reflect.metadata('tapjaw:command:example', type);
    },
    Arguments: (...args: Argument[]) => {
        return Reflect.metadata('tapjaw:command:arguments', args);
    },
    Options: (...args: CommandOption[]) => {
        return Reflect.metadata('tapjaw:command:options', args);
    },
    Action: (action: CommandAction) => {
        return Reflect.metadata('tapjaw:command:action', action);
    },
};
