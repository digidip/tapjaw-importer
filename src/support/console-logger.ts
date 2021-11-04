import TapjawLogger from '../contracts/tapjaw-logger';

export default class ConsoleLogger implements TapjawLogger {
    public error(message: string | Error): TapjawLogger {
        console.error(message);
        return this;
    }

    public warn(message: string | Error): TapjawLogger {
        console.warn(String(message));
        return this;
    }

    public info(message: string | Error): TapjawLogger {
        console.info(String(message));
        return this;
    }

    public debug(message: string | Error): TapjawLogger {
        console.debug(String(message));
        return this;
    }

    public verbose(message: string | Error): TapjawLogger {
        console.log(String(message));
        return this;
    }

    public silly(message: string | Error): TapjawLogger {
        console.log(String(message));
        return this;
    }

    public log(level: string, message: string | Error): TapjawLogger {
        console.log(level, String(message));
        return this;
    }
}
