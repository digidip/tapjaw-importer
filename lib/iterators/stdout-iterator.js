"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const output_iterator_1 = (0, tslib_1.__importDefault)(require("./output-iterator"));
const tapjaw_iterator_1 = require("../contracts/tapjaw-iterator");
/**
 * Iterate TapjawMessages from implemented adapter, convert each to JSON and write to the STDOUT buffer.
 */
class StdoutIterator extends output_iterator_1.default {
    constructor(writeCallback) {
        super();
        this.writeCallback = writeCallback;
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
            throw new tapjaw_iterator_1.TapjawIteratorError('message could not be parsed into JSON.');
        }
        /**
         * Write JSON to stdout buffer.
         */
        this.writeCallback.write(`${json}\n`);
        return Promise.resolve();
    }
}
exports.default = StdoutIterator;
