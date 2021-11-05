export default interface BaseTapjawCommand {
    run(...args: unknown[]): Promise<void>;
}
export declare type TapjawCommandArgs<T = unknown> = Record<string, T>;
export declare type TapjawCommandFlags<T = unknown> = Record<string, T>;
export interface TapjawCommandDefaultFlags<T = unknown> extends TapjawCommandFlags<T | string> {
    limit: string;
}