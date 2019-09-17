/// <reference types="node" />
import OutputIterator from './output-iterator';
import TapjawMessage from '../contracts/tapjaw-message';
export default class StdoutIterator extends OutputIterator {
    protected readonly writeBuffer: NodeJS.WriteStream;
    protected pretty: boolean;
    constructor(writeBuffer: NodeJS.WriteStream);
    setPretty(polarity: boolean): void;
    protected outputMessage(message: TapjawMessage): void;
}
