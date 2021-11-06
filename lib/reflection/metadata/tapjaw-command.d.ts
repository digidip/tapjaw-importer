import { Argument } from 'commander';
import { CommandAction } from '../../contracts/commands/base-tapjaw-command';
declare const _default: {
    Name: (type: string) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Description: (type: string) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Example: (type: string) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Arguments: (...args: Argument[]) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    Action: (action: CommandAction) => {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
};
export default _default;
