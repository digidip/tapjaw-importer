"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_iterator_1 = require("./output-iterator");
class StdoutIterator extends output_iterator_1.default {
    constructor(writeBuffer) {
        super();
        this.writeBuffer = writeBuffer;
        this.pretty = false;
    }
    setPretty(polarity) {
        this.pretty = polarity;
    }
    outputMessage(message) {
        const json = JSON.stringify(message, null, this.pretty ? 2 : undefined);
        this.writeBuffer.write(`${json}\n`);
    }
}
exports.default = StdoutIterator;
