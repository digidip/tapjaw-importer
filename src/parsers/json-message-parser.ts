import TapjawLogger from '../contracts/tapjaw-logger';
import TapjawMessage from '../messages/tapjaw-message';

export default function jsonMessageParser<M extends TapjawMessage>(
    line: string,
    displayJsonParseErrors: boolean,
    logger: TapjawLogger
): M | null {
    let message: M | null = null;

    try {
        message = JSON.parse(line) as M;
    } catch (error) {
        if (displayJsonParseErrors === true && error instanceof SyntaxError) {
            logger.error(error);
        }
    }

    return message;
}
