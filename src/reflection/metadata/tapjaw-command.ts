/* eslint-disable @typescript-eslint/ban-types */
import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/base-tapjaw-command';
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Name(string)**
 */
export function Name(type: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:name', type, target.prototype as object, 'class');
    };
}
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Description(string)**
 */
export function Description(type: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:description', type, target.prototype as object, 'class');
    };
}
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Example(string)**
 */
export function Example(type: string): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:example', type, target.prototype as object, 'class');
    };
}
/**
 * @param   Argument[] ...args
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Arguments({@link Argument}[])**
 */
export function Arguments(...args: Argument[]): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:arguments', args, target.prototype as object, 'class');
    };
}
/**
 * @param   CommandOption[] ...args
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Options({@link CommandOption}[])**
 */
export function Options(...args: CommandOption[]): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:options', args, target.prototype as object, 'class');
    };
}
/**
 * @param   CommandAction action
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Action({@link CommandAction})**
 */
export function Action(action: CommandAction): CallableFunction {
    return (target: Function) => {
        Reflect.defineMetadata('tapjaw:command:action', action, target.prototype as object, 'class');
    };
}
