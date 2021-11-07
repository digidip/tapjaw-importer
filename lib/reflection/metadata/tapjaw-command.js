"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Name: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:name', type, target.prototype, 'class');
        };
    },
    Description: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:description', type, target.prototype, 'class');
        };
    },
    Example: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:example', type, target.prototype, 'class');
        };
    },
    Arguments: (...args) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:arguments', args, target.prototype, 'class');
        };
    },
    Options: (...args) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:options', args, target.prototype, 'class');
        };
    },
    Action: (action) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:action', action, target.prototype, 'class');
        };
    },
};
