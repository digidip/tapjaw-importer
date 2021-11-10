/// <reference types="node" />
import TapjawMessage from '../messages/tapjaw-message';
import TapjawIterator from '../contracts/tapjaw-iterator';
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
    protected readonly writeCallback: NodeJS.WritableStream;
    protected readonly messagesPerMinute: number;
    constructor(writeCallback: NodeJS.WritableStream, messagesPerMinute: number);
    run(adapterCallback: TapjawAdapterCallback<TapjawMessage>, limit?: number): Promise<void>;
    protected sleep(milliseconds: number): Promise<void>;
    /**
     * Write message to STDOUT.
     *
     * @param message TapjawMessage
     */
    protected outputMessage(message: TapjawMessage): Promise<void>;
}
