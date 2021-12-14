import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/tapjaw-command';
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Name(string)**
 */
export declare function Name(type: string): CallableFunction;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Description(string)**
 */
export declare function Description(type: string): CallableFunction;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Example(string)**
 */
export declare function Example(type: string): CallableFunction;
/**
 * @param   Argument[] ...args
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Arguments({@link Argument}[])**
 */
export declare function Arguments(...args: Argument[]): CallableFunction;
/**
 * @param   CommandOption[] ...args
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Options({@link CommandOption}[])**
 */
export declare function Options(...args: CommandOption[]): CallableFunction;
/**
 * @param   CommandAction action
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Action({@link CommandAction})**
 */
export declare function Action(action: CommandAction): CallableFunction;
