import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/commands/base-tapjaw-command';

export default {
    Name: (type: string) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:command:name', type, target);
        };
    },
    Description: (type: string) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:command:description', type, target);
        };
    },
    Example: (type: string) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:command:example', type, target);
        };
    },
    Arguments: (...args: Argument[]) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:command:arguments', args, target);
        };
    },
    Options: (...args: CommandOption[]) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:command:options', args, target);
        };
    },
    Action: (action: CommandAction) => {
        return (target: object) => {
            Reflect.defineMetadata('tapjaw:command:action', action, target);
        };
    },
};
