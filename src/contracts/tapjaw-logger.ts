export default interface TapjawLogger {
    error: (message: string | Error) => TapjawLogger;
    warn: (message: string | Error) => TapjawLogger;
    info: (message: string | Error) => TapjawLogger;
    debug: (message: string | Error) => TapjawLogger;
    verbose: (message: string | Error) => TapjawLogger;
    silly: (message: string | Error) => TapjawLogger;
    log: (level: string, message: string | Error) => TapjawLogger;
}
