import { Command } from 'commander';
import { TapjawCommand } from '../commands';
export default function (this: TapjawCommand & {
    prototype?: object;
}, program: Command): Command;
