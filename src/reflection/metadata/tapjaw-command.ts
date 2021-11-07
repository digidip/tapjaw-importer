/* eslint-disable @typescript-eslint/ban-types */
import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/commands/base-tapjaw-command';

export default {
    Name: (type: string) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:command:name', type, target.prototype as object, 'class');
        };
    },
    Description: (type: string) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:command:description', type, target.prototype as object, 'class');
        };
    },
    Example: (type: string) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:command:example', type, target.prototype as object, 'class');
        };
    },
    Arguments: (...args: Argument[]) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:command:arguments', args, target.prototype as object, 'class');
        };
    },
    Options: (...args: CommandOption[]) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:command:options', args, target.prototype as object, 'class');
        };
    },
    Action: (action: CommandAction) => {
        return (target: Function) => {
            Reflect.defineMetadata('tapjaw:command:action', action, target.prototype as object, 'class');
        };
    },
};
