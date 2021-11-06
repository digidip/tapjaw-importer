"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Name: (type) => {
        return Reflect.metadata('tapjaw:command:name', type);
    },
    Description: (type) => {
        return Reflect.metadata('tapjaw:command:description', type);
    },
    Example: (type) => {
        return Reflect.metadata('tapjaw:command:example', type);
    },
    Arguments: (...args) => {
        return Reflect.metadata('tapjaw:command:arguments', args);
    },
    Action: (action) => {
        return Reflect.metadata('tapjaw:command:action', action);
    },
};
