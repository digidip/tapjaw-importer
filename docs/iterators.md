# Iterators


## StdoutIterator

The StdoutIterator is the most basic mechanism, which will take each yielded `TapjawMessage` and parsed into a JSON string, then written to the STDOUT buffer followed by a newline (`\n`), wholly referred to as a `JSONL` stream.

Using the STDOUT buffer allows commands to pipe the JSON message into another program's STDIN buffer or append it to a file.

## RateLimitedStdoutIterator

xxx
