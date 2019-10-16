import OutputIterator from './output-iterator';
import TapjawMessage from '../contracts/tapjaw-message';
import { TapjawIteratorError } from '../contracts/tapjaw-iterator';

/**
 * Iterate TapjawMessages from implemented adapter, convert each to JSON and write to the STDOUT buffer.
 */
export default class StdoutIterator extends OutputIterator {
    protected pretty = false;

    constructor(protected readonly writeCallback: NodeJS.WritableStream) {
        super();
    }

    /**
     * Whether to output the JSON with pretty indentation and newlines.
     *
     * @param polarity boolean
     */
    public setPretty(polarity: boolean): void {
        this.pretty = polarity;
    }

    /**
     * Write message to STDOUT.
     *
     * @param message TapjawMessage
     */
    protected async outputMessage(message: TapjawMessage): Promise<void> {
        const json = JSON.stringify(
            message,
            null,
            this.pretty ? 2 : undefined
        );

        if (!json) {
            return Promise.reject(new TapjawIteratorError('message could not be parsed into JSON.'));
        }

        /**
         * Write JSON to stdout buffer.
         */
        this.writeCallback.write(`${json}\n`);

        return Promise.resolve();
    }
}
