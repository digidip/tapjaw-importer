"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.Options = exports.Arguments = exports.Example = exports.Description = exports.Name = void 0;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Name(string)**
 */
function Name(type) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:command:name', type, target.prototype, 'class');
    };
}
exports.Name = Name;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Description(string)**
 */
function Description(type) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:command:description', type, target.prototype, 'class');
    };
}
exports.Description = Description;
/**
 * @param  string type
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Example(string)**
 */
function Example(type) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:command:example', type, target.prototype, 'class');
    };
}
exports.Example = Example;
/**
 * @param   Argument[] ...args
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Arguments({@link Argument}[])**
 */
function Arguments(...args) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:command:arguments', args, target.prototype, 'class');
    };
}
exports.Arguments = Arguments;
/**
 * @param   CommandOption[] ...args
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Options({@link CommandOption}[])**
 */
function Options(...args) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:command:options', args, target.prototype, 'class');
    };
}
exports.Options = Options;
/**
 * @param   CommandAction action
 * @returns CallableFunction
 * @function **@TapjawMetadata.Command.Action({@link CommandAction})**
 */
function Action(action) {
    return (target) => {
        Reflect.defineMetadata('tapjaw:command:action', action, target.prototype, 'class');
    };
}
exports.Action = Action;
