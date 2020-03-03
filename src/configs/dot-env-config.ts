import TapjawConfigError from '../errors/tapjaw-config-error';
import namespaceFilterToken from './support/namespace-filter-token';

export interface ConfigNamespace {
    [name: string]: string;
}

abstract class DotEnvConfig {
    protected readonly config: ConfigNamespace = {};

    constructor(
        private readonly configName: string,
        private readonly configKey: string
    ) {
        Object.keys(process.env)
            .filter((envKey: string) =>
                namespaceFilterToken(envKey, this.configKey)
            )
            .forEach(this.initialiseConfig.bind(this));
    }

    public getConfig(configKey: string): string | never {
        const key = configKey.toLowerCase();

        if (!this.config[key]) {
            throw new TapjawConfigError(
                `${this.configName} key "${key}" does not exist.`
            );
        }

        return this.config[key] as string;
    }

    private initialiseConfig(jobsEnvKey: string): void {
        const configStr = process.env[jobsEnvKey] as string | undefined;
        if (!configStr) {
            throw new TapjawConfigError(
                `.evn ${this.configName} variable "${jobsEnvKey}" is empty.`
            );
        }

        this.config[ jobsEnvKey.replace(this.configKey, '').toLowerCase()
] = configStr as string;
    }
}

export default DotEnvConfig;
