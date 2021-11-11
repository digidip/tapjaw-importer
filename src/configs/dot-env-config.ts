import TapjawConfigError from '../errors/tapjaw-config-error';
import namespaceFilterToken from './support/namespace-filter-token';

/**
 * The configuration mape
 */
export type ConfigurationMap = Map<string, string>;

/**
 * The default process.env configuration loader for Tapjaw Importer.
 */
export default abstract class DotEnvConfig {
    protected readonly config: ConfigurationMap = new Map();

    /**
     * @param configName                string  Custom name for the config loader class.
     * @param configNamespaceKey        string  The namespace key which this class should load. For example `APP_`
     *                                          will import all configurations values starting with key `APP_*.
     */
    constructor(private readonly configName: string, private readonly configNamespaceKey: string) {
        Object.keys(process.env)
            .filter((envKey: string) => namespaceFilterToken(envKey, this.configNamespaceKey))
            .forEach(this.initialiseConfig.bind(this));
    }

    /**
     * Get a configuration value from the available configurations in this classes namespace.
     *
     * @param configKey string  The configuration key minus the `this.configNamespaceKey`.
     *                          For example `APP_NAME` would be requested with `this.getConfig('NAME');`.
     * @returns string | never
     * @throws {@link TapjawConfigError}
     */
    public getConfig(configKey: string): string | never {
        const key = configKey.toLowerCase();

        if (!this.config.has(key)) {
            throw new TapjawConfigError(`${this.configName} key "${key}" does not exist.`);
        }

        return this.config.get(key) as string;
    }

    /**
     * Register a configuration name and value into this configuration instance.
     *
     * @param jobsEnvKey string The fullname of the configuration key to registered.
     */
    private initialiseConfig(jobsEnvKey: string): void {
        const configStr = process.env[jobsEnvKey];
        if (!configStr) {
            throw new TapjawConfigError(`.evn ${this.configName} variable "${jobsEnvKey}" is empty.`);
        }

        this.config.set(jobsEnvKey.replace(this.configNamespaceKey, '').toLowerCase(), configStr);
    }
}
