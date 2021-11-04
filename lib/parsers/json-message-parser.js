"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (line, displayJsonParseErrors, logger) => {
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
};
