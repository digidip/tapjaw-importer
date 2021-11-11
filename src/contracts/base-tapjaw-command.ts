/**
 * @module TapjawCommand
 */
export default interface BaseTapjawCommand {
    run(...args: unknown[]): Promise<void>;
}

export type TapjawCommandArgs<T = unknown> = Record<string, T>;
export type TapjawCommandFlags<T = unknown> = Record<string, T>;

export interface TapjawCommandDefaultFlags<T = unknown> extends TapjawCommandFlags<T | string> {
    limit: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionArgs = any[];

export type CommandAction = (...args: ActionArgs) => void | Promise<void>;

export type CommandOption = {
    flags: string;
    description?: string;
    defaultValue?: string | boolean;
    required?: boolean;
};
