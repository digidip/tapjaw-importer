import TapjawIterator from '../contracts/tapjaw-iterator';
import TapjawMessage from '../messages/tapjaw-message';
import { TapjawAdapterCallback } from '../contracts/tapjaw-adapter';

/**
 * An abstract Iterator responsibile for iterating over an adapter's
 * yielded TapjawMessages, then provides the message to an abstract
 * outputMessage() method for outputting to an implemented mechanism.
 *
 * The class also employs the limit argument to limit the number of
 * TapjawMessages being passed to the outputMessage() method.
 */
export default abstract class OutputIterator implements TapjawIterator {
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
            await this.outputMessage(adapterMessage.value);
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
        }
    }

    /**
     * Output a message to a specific output mechanism.
     *
     * @param message TapjawMessage
     */
    protected abstract outputMessage(message: TapjawMessage): Promise<void>;
}
