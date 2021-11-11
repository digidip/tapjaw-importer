/* eslint-disable @typescript-eslint/no-unused-vars */
import TapjawLogger from '../contracts/tapjaw-logger';

export default class NullLogger implements TapjawLogger {
    public error(message: string | Error): TapjawLogger {
        return this;
    }

    public warn(message: string | Error): TapjawLogger {
        return this;
    }

    public info(message: string | Error): TapjawLogger {
        return this;
    }

    public debug(message: string | Error): TapjawLogger {
        return this;
    }

    public verbose(message: string | Error): TapjawLogger {
        return this;
    }

    public silly(message: string | Error): TapjawLogger {
        return this;
    }

    public log(level: string, message: string | Error): TapjawLogger {
        return this;
    }
}
