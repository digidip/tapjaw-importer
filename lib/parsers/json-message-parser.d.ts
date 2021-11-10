import TapjawLogger from '../contracts/tapjaw-logger';
import TapjawMessage from '../messages/tapjaw-message';
export default function jsonMessageParser<M extends TapjawMessage>(line: string, displayJsonParseErrors: boolean, logger: TapjawLogger): M | null;
