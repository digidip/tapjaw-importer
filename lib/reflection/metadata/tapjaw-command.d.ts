import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/commands/base-tapjaw-command';
declare const _default: {
    Name: (type: string) => (target: Function) => void;
    Description: (type: string) => (target: Function) => void;
    Example: (type: string) => (target: Function) => void;
    Arguments: (...args: Argument[]) => (target: Function) => void;
    Options: (...args: CommandOption[]) => (target: Function) => void;
    Action: (action: CommandAction) => (target: Function) => void;
};
export default _default;
