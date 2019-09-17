import OutputIterator from './output-iterator';
import TapjawMessage from '../contracts/tapjaw-message';

export default class StdoutIterator extends OutputIterator {
    protected pretty = false;

    constructor(protected readonly writeBuffer: NodeJS.WriteStream) {
        super();
    }

    public setPretty(polarity: boolean): void {
        this.pretty = polarity;
    }

    protected outputMessage(message: TapjawMessage): void {
        const json = JSON.stringify(
            message,
            null,
            this.pretty ? 2 : undefined
        );
        this.writeBuffer.write(`${json}\n`);
    }
}
