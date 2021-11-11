/* eslint-disable @typescript-eslint/ban-types */
import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/tapjaw-command';
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Name(string)**
 */
export function Name(type: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:name', type, target.prototype as object, 'class');
    };
}
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Description(string)**
 */
export function Description(type: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:description', type, target.prototype as object, 'class');
    };
}
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Example(string)**
 */
export function Example(type: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:example', type, target.prototype as object, 'class');
    };
}
/**
 * @param   Argument[] ...args
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Arguments({@link Argument}[])**
 */
export function Arguments(...args: Argument[]): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:arguments', args, target.prototype as object, 'class');
    };
}
/**
 * @param   CommandOption[] ...args
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Options({@link CommandOption}[])**
 */
export function Options(...args: CommandOption[]): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:options', args, target.prototype as object, 'class');
    };
}
/**
 * @param   CommandAction action
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Action({@link CommandAction})**
 */
export function Action(action: CommandAction): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:action', action, target.prototype as object, 'class');
    };
}
