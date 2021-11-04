export default interface BaseTapjawCommand {
    run(...args: unknown[]): Promise<void>;
}

export type TapjawCommandArgs<T = unknown> = Record<string, T>;
export type TapjawCommandFlags<T = unknown> = Record<string, T>;

export interface TapjawCommandDefaultFlags extends TapjawCommandFlags<string> {
    limit: string;
}
