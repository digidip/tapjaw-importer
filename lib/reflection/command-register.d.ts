import { Command } from 'commander';
import { BaseTapjawCommand } from '../contracts/commands';
export default function (this: BaseTapjawCommand & {
    prototype?: object;
}, program: Command): Command;
