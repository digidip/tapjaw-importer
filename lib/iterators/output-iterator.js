"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OutputIterator {
    async run(adapterMethod, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const messages = await adapterMethod();
                let done = false;
                let adapterMessage;
                let messageCount = 0;
                adapterMessage = await messages.next();
                while (!adapterMessage.done && !done) {
                    this.outputMessage(adapterMessage.value);
                    messageCount++;
                    if (limit) {
                        if (messageCount >= limit) {
                            done = true;
                        }
                    }
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
