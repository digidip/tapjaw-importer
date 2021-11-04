import TapjawLogger from '../contracts/tapjaw-logger';
import TapjawMessage from '../contracts/tapjaw-message';

export default <M extends TapjawMessage>(
    line: string,
    displayJsonParseErrors: boolean,
    logger: TapjawLogger
): M | null => {
    let message: M | null = null;

    try {
        message = JSON.parse(line) as M;
    } catch (error) {
        if (displayJsonParseErrors === true && error instanceof SyntaxError) {
            logger.error(error);
        }
    }

    return message;
};
