export default class TapjawConfigError extends Error {
    constructor(message: string) {
        super(message);
        this.message =
            `\n ConfigError occured\n======================================================` + `\n${this.message}`;
        this.name = 'TapjawConfigError';
    }
}
