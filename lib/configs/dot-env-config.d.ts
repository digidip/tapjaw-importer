export interface ConfigNamespace {
    [name: string]: string;
}
declare abstract class DotEnvConfig {
    private readonly configName;
    private readonly configKey;
    protected readonly config: ConfigNamespace;
    constructor(configName: string, configKey: string);
    getConfig(configKey: string): string | never;
    private initialiseConfig;
}
export default DotEnvConfig;
