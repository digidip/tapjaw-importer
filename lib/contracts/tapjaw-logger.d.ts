/**
 * Default Tapjaw Logger interface.
 *
 * Implement the `TapjawLogger` interface with a third-party library to allow for easy injection into Taphaw Importer
 * classes.
 *
 * @see {@link ConsoleLogger} for a logger which uses the JavaScript console object.
 * @see {@link NullLogger} for a silent logger. Useful for testing purposes.
 *
 */
export default interface TapjawLogger {
    error: (message: string | Error) => TapjawLogger;
    warn: (message: string | Error) => TapjawLogger;
    info: (message: string | Error) => TapjawLogger;
    debug: (message: string | Error) => TapjawLogger;
    verbose: (message: string | Error) => TapjawLogger;
    silly: (message: string | Error) => TapjawLogger;
    log: (level: string, message: string | Error) => TapjawLogger;
}
