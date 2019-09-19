"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An abstract Iterator responsibile for iterating over an adapter's
 * yielded TapjawMessages, then provides the message to an abstract
 * outputMessage() method for outputting to an implemented mechanism.
 *
 * The class also employs the limit argument to limit the number of
 * TapjawMessages being passed to the outputMessage() method.
 */
class OutputIterator {
    async run(adapterCallback, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const messages = await adapterCallback();
                let done = false;
                let adapterMessage;
                let messageCount = 0;
                adapterMessage = await messages.next();
                while (!adapterMessage.done && !done) {
                    /**
                     * Output the message to an implemented writer mechanism.
                     */
                    await this.outputMessage(adapterMessage.value).catch(reject);
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
            catch (error) {
                return reject(error);
            }
            resolve();
        });
    }
}
exports.default = OutputIterator;
