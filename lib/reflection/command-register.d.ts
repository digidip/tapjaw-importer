import { Command } from 'commander';
import { TapjawCommand } from '../commands';
export default function (this: TapjawCommand & {
    prototype?: Record<string, unknown>;
}, program: Command): Command;
