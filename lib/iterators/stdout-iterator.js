"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_iterator_1 = require("./output-iterator");
const tapjaw_iterator_1 = require("../contracts/tapjaw-iterator");
/**
 * Iterate TapjawMessages from implemented adapter, convert each to JSON and write to the STDOUT buffer.
 */
class StdoutIterator extends output_iterator_1.default {
    constructor(writeBuffer) {
        super();
        this.writeBuffer = writeBuffer;
        this.pretty = false;
    }
    /**
     * Whether to output the JSON with pretty indentation and newlines.
     *
     * @param polarity boolean
     */
    setPretty(polarity) {
        this.pretty = polarity;
    }
    /**
     * Write message to STDOUT.
     *
     * @param message TapjawMessage
     */
    async outputMessage(message) {
        const json = JSON.stringify(message, null, this.pretty ? 2 : undefined);
        if (!json) {
            return Promise.reject(new tapjaw_iterator_1.TapjawIteratorError('message could not be parsed into JSON.'));
        }
        /**
         * Write JSON to stdout buffer.
         */
        this.writeBuffer.write(`${json}\n`);
        return Promise.resolve();
    }
}
exports.default = StdoutIterator;
