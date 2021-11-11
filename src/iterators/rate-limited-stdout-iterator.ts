import TapjawMessage from '../messages/tapjaw-message';
import TapjawIterator, { TapjawIteratorError } from '../contracts/tapjaw-iterator';
import { TapjawAdapterCallback } from '../contracts/tapjaw-adapter';

/**
 * An abstract Iterator responsibile for iterating over an adapter's
 * yielded TapjawMessages, then provides the message to an abstract
 * outputMessage() method for outputting to an implemented mechanism.
 *
 * The class also employs the limit argument to limit the number of
 * TapjawMessages being passed to the outputMessage() method.
 */
export default class RateLimitedStdoutIterator implements TapjawIterator {
    constructor(
        protected readonly writeCallback: NodeJS.WritableStream,
        protected readonly messagesPerMinute: number
    ) {}

    public async run(adapterCallback: TapjawAdapterCallback<TapjawMessage>, limit?: number): Promise<void> {
        const messages = adapterCallback();
        let done = false;
        let adapterMessage;
        let messageCount = 0;
        adapterMessage = await messages.next();

        while (!adapterMessage.done && !done) {
            /**
             * Output the message to an implemented writer mechanism.
             */
            const message = adapterMessage.value;
            await this.outputMessage(message);
            messageCount++;

            /**
             * Limit the number of messages to output.
             */
            if (limit) {
                if (messageCount >= limit) {
                    done = true;
                }
            }

            /**
             * Grab the next TapjawMessage and inform the Adapter if the iteration
             * is complete.
             */
            adapterMessage = await messages.next(done);
            await this.sleep(Math.ceil(60000 / this.messagesPerMinute));
        }
    }

    protected sleep(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    /**
     * Write message to STDOUT.
     *
     * @param message TapjawMessage
     */
    protected async outputMessage(message: TapjawMessage): Promise<void> {
        const json = JSON.stringify(message);

        if (!json) {
            throw new TapjawIteratorError('message could not be parsed into JSON.');
        }

        /**
         * Write JSON to stdout buffer.
         */
        this.writeCallback.write(`${json}\n`);

        return Promise.resolve();
    }
}
