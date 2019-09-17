import TapjawIterator from '../contracts/tapjaw-iterator';
import TapjawMessage from '../contracts/tapjaw-message';

export default abstract class OutputIterator implements TapjawIterator {
    public async run(adapterMethod: CallableFunction, limit?: number): Promise<any> {
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
            } catch (error) {
                return reject(error);
            }

            resolve();
        });
    }

    protected abstract outputMessage(message: TapjawMessage): void;
}
