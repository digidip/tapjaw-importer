import TapjawIterator from '../contracts/tapjaw-iterator';
import TapjawMessage from '../contracts/tapjaw-message';
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
    run(adapterCallback: TapjawAdapterCallback<TapjawMessage>, limit?: number): Promise<any>;
    /**
     * Output a message to a specific output mechanism.
     *
     * @param message TapjawMessage
     */
    protected abstract outputMessage(message: TapjawMessage): Promise<void>;
}
