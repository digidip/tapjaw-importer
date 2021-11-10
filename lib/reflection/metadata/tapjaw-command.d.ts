import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/commands/base-tapjaw-command';
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Name(string)**
 */
export declare function Name(type: string): CallableFunction;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Description(string)**
 */
export declare function Description(type: string): CallableFunction;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Example(string)**
 */
export declare function Example(type: string): CallableFunction;
/**
 * @param   Argument[] ...args
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Arguments({@link Argument}[])**
 */
export declare function Arguments(...args: Argument[]): CallableFunction;
/**
 * @param   CommandOption[] ...args
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Options({@link CommandOption}[])**
 */
export declare function Options(...args: CommandOption[]): CallableFunction;
/**
 * @param   CommandAction action
 * @returns CallableFunction
 * @function **@TapjawConfigure.Command.Action({@link CommandAction})**
 */
export declare function Action(action: CommandAction): CallableFunction;
