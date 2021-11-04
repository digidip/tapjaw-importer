import { TapjawAdapterCallback } from './tapjaw-adapter';
import TapjawMessage from './tapjaw-message';
export declare class TapjawIteratorError extends Error {
}
/**
 * The iterator's responsibility focuses on bringing together the responses
 * from Adapters and implement a mechanism on how to write/output the individual
 * message to a buffer or service.
 *
 * @see OutputIterator
 * @see StdoutIterator
 */
export default interface TapjawIterator {
    /**
     * Priamry method which must implement an iteration over the
     * Adapter's generator yield response and push the individual
     * TapjawMessage from the adapter to an output interface.
     *
     * @param adapterCallback CallableFunction      A callback which contains the routine on how to execute the
     *                                              Adapter method.
     * @param limit number|undefined                Limit the number of TapjawMessage that should be processed.
     */
    run(adapterCallback: TapjawAdapterCallback<TapjawMessage>, limit?: number): Promise<unknown>;
}
