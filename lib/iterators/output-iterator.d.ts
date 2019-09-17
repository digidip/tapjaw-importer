import TapjawIterator from '../contracts/tapjaw-iterator';
import TapjawMessage from '../contracts/tapjaw-message';
export default abstract class OutputIterator implements TapjawIterator {
    run(adapterMethod: CallableFunction, limit?: number): Promise<any>;
    protected abstract outputMessage(message: TapjawMessage): void;
}
