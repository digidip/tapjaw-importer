import { Argument } from 'commander';
import { CommandAction, CommandOption } from '../../contracts/commands/base-tapjaw-command';
declare const _default: {
    Name: (type: string) => (target: object) => void;
    Description: (type: string) => (target: object) => void;
    Example: (type: string) => (target: object) => void;
    Arguments: (...args: Argument[]) => (target: object) => void;
    Options: (...args: CommandOption[]) => (target: object) => void;
    Action: (action: CommandAction) => (target: object) => void;
};
export default _default;
