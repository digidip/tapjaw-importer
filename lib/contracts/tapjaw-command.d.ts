/**
 * @module TapjawCommand
 */
export default interface TapjawCommand {
    run(...args: unknown[]): Promise<void>;
}
export declare type TapjawCommandArgs<T = unknown> = Record<string, T>;
export declare type TapjawCommandFlags<T = unknown> = Record<string, T>;
export interface TapjawCommandDefaultFlags<T = unknown> extends TapjawCommandFlags<T | string> {
    limit: string;
}
export declare type ActionArgs = any[];
export declare type CommandAction = (...args: ActionArgs) => void | Promise<void>;
export declare type CommandOption = {
    flags: string;
    description?: string;
    defaultValue?: string | boolean;
    required?: boolean;
};
