/**
 * @module TapjawAdapter
 */
import TapjawMessage from '../messages/tapjaw-message';

/**
 * @deprecated
 */
export type TapjawAdapterArguments = Record<string, unknown>;

/**
 * The default yielding method for a `TapjawAdapter` class.
 *
 * @ref {@link TapjawAdapter}
 */
export type TapjawAdapterCallback<T extends TapjawMessage> = () => AsyncGenerator<T>;

/**
 * An abstract method type used in the `TapjawAdapter` for defining methods.
 *
 * @ref {@link TapjawAdapter}
 */
export type GenericMethod = () => unknown;

/**
 * Default TapjawAdapter type, used as a link between a {@link TapjawApiCommand} and a {@link TapjawConnector} to handle
 * incoming payloads from the {@link TapjawConnector}.
 *
 * The Adapter implementation gets designed to understand the schema from a {@link TapjawConnector} response, allowing
 * the adapter to iterate and yield each entity from the payload to a defined {@link TapjawAdapterCallback} callback
 * on the {@link TapjawApiCommand}.
 *
 * Each Adapter class created **must** include at least one {@link TapjawAdapterCallback} method to yield
 * the results of the {@link TapjawConnector} payload.
 *
 * For example:
 * ```
 * class MyAdapter implements TapjawAdapter<MyAdapter, MyTapjawMessage> {
 *     construtor(private readonly connector: TapjawConnector) {}
 *
 *     // TapjawAdapterCallback method...
 *     protected async * getMesssages(): AsyncGenerator<MyTapjawMessage> {
 *         const response = await this.connector.getSomething();
 *         // validate response...
 *         for (const item of response.items) {
 *             // Yield to TapjawApiCommand configured iterator.
 *             yield new MyAdapterMessage('...', item);
 *         }
 *     }
 *
 *     // Generic methods...
 *     public something(): string {
 *         return 'something';
 *     }
 * }
 * ```
 * Please refer to {@link TapjawApiCommand} to understand how a {@link TapjawAdapter} is used.
 */
type TapjawAdapter<T, U extends TapjawMessage> = {
    [P in keyof T]: TapjawAdapterCallback<U> | GenericMethod | number | boolean | string | unknown[];
};

export default TapjawAdapter;
