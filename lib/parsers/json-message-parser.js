"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function jsonMessageParser(line, displayJsonParseErrors, logger) {
    let message = null;
    try {
        message = JSON.parse(line);
    }
    catch (error) {
        if (displayJsonParseErrors === true && error instanceof SyntaxError) {
            logger.error(error);
        }
    }
    return message;
}
exports.default = jsonMessageParser;
