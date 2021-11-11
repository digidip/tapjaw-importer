import { Command } from 'commander';
import { BaseTapjawCommand } from '../commands';
export default function (this: BaseTapjawCommand & {
    prototype?: object;
}, program: Command): Command;
