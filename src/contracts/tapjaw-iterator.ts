import { TapjawAdapterCallback } from './tapjaw-adapter';
import TapjawMessage from '../messages/tapjaw-message';

export class TapjawIteratorError extends Error {}

/**
 * The iterator's responsibility focuses on bringing together the responses from Adapters and implementing a
 * mechanism on how to write/output the individual message to a buffer or service.
 *
 * @see {@link OutputIterator}
 * @see {@link StdoutIterator}
 */
export default interface TapjawIterator {
    /**
     * This primary method must perform an iteration over the Adapter's generator to yield responses and push each
     * individual `TapjawMessage` from the Adapter to an output interface.
     *
     * @param adapterCallback TapjawAdapterCallback<TapjawMessage>      A callback which contains the routine on how to
     *                                                                  execute the {@link TapjawAdapter} method.
     * @param limit number|undefined                                    Limit the number of TapjawMessage that should
     *                                                                  be processed.
     * @returns Promise<unknown>
     */
    run(adapterCallback: TapjawAdapterCallback<TapjawMessage>, limit?: number): Promise<unknown>;
}
