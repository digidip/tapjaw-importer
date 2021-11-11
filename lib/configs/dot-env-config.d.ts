/**
 * The configuration mape
 */
export declare type ConfigurationMap = Map<string, string>;
/**
 * The default process.env configuration loader for Tapjaw Importer.
 */
export default abstract class DotEnvConfig {
    private readonly configName;
    private readonly configNamespaceKey;
    protected readonly config: ConfigurationMap;
    /**
     * @param configName                string  Custom name for the config loader class.
     * @param configNamespaceKey        string  The namespace key which this class should load. For example `APP_`
     *                                          will import all configurations values starting with key `APP_*.
     */
    constructor(configName: string, configNamespaceKey: string);
    /**
     * Get a configuration value from the available configurations in this classes namespace.
     *
     * @param configKey string  The configuration key minus the `this.configNamespaceKey`.
     *                          For example `APP_NAME` would be requested with `this.getConfig('NAME');`.
     * @returns string | never
     * @throws {@link TapjawConfigError}
     */
    getConfig(configKey: string): string | never;
    /**
     * Register a configuration name and value into this configuration instance.
     *
     * @param jobsEnvKey string The fullname of the configuration key to registered.
     */
    private initialiseConfig;
}
