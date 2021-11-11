/// <reference types="node" />
import OutputIterator from './output-iterator';
import TapjawMessage from '../messages/tapjaw-message';
/**
 * Iterate TapjawMessages from implemented adapter, convert each to JSON and write to the STDOUT buffer.
 */
export default class StdoutIterator extends OutputIterator {
    protected readonly writeCallback: NodeJS.WritableStream;
    protected pretty: boolean;
    constructor(writeCallback: NodeJS.WritableStream);
    /**
     * Whether to output the JSON with pretty indentation and newlines.
     *
     * @param polarity boolean
     */
    setPretty(polarity: boolean): void;
    /**
     * Write message to STDOUT.
     *
     * @param message TapjawMessage
     */
    protected outputMessage(message: TapjawMessage): Promise<void>;
}
