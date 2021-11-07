"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Name: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:name', type, target);
        };
    },
    Description: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:description', type, target);
        };
    },
    Example: (type) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:example', type, target);
        };
    },
    Arguments: (...args) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:arguments', args, target);
        };
    },
    Options: (...args) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:options', args, target);
        };
    },
    Action: (action) => {
        return (target) => {
            Reflect.defineMetadata('tapjaw:command:action', action, target);
        };
    },
};
