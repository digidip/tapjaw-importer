import TapjawLogger from '../contracts/tapjaw-logger';
export default class ConsoleLogger implements TapjawLogger {
    error(message: string | Error): TapjawLogger;
    warn(message: string | Error): TapjawLogger;
    info(message: string | Error): TapjawLogger;
    debug(message: string | Error): TapjawLogger;
    verbose(message: string | Error): TapjawLogger;
    silly(message: string | Error): TapjawLogger;
    log(level: string, message: string | Error): TapjawLogger;
}
