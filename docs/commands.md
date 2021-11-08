# Commands

Commands in Tapjaw Importer have three distinct approaches when it comes to streaming data.
1. `[STDOUT]` API based commands can only write to the STDOUT buffer, emitting each JSON message as a string followed by a new line. *(import from `TapjawApiCommand`)*
2. `[STDIN/STDOUT]`
   1. Filter based commands use both STDIN and STDOUT buffers like a valve. Options or arguments can be defined to perform further narrowing of the filter. *(import from `TapjawFilterCommand`)*
   2. Tool based commands can use either buffer for any number of reasons, such as message mutators, data loggers, or a more complex or specific filter command. *(import from `TapjawToolCommand`)*
3. `[STDIN]` Store commands only read the STDIN buffer. All messages received from the STDIN buffer must get written to an external interface. *(import from `TapjawStoreCommand`)*

## Stream back pressure

Back preassure is a common problem when piped commands are joined together, the STDIO buffers are designed to take data from a source and provide it to the destination as soon as possible.

If STDIN buffer in reciever command cannot handle the volume quickly enough, it will cause the buffer to overflow and crash the entire pipe, resulting in all commands terminating.

### Back pressure prevention on API commands

The API command must not write JSONL messages to STDOUT buffer too quickly. The number of messages can be estimated based on the size of the expected payloads received by an API connector.

In low data volume payloads, the default `StdoutIterator` should suffice.

An adapter configured to perform pagination with a more significant number of items per response payload will likely cause back pressure down the stream.

For situations where a substantial quantity of messages will need to get piped, Tapjaw Importer provides a useful iterator called `RateLimitedStdoutIterator` to reduce the likelihood of these issues occurring. Please see to [Iterators](./iterators.md) for more details.

### Back pressure prevention on Filter, Tool and Store commands

Latency in filter, tool and store commands should also get taken seriously. For example, a command could be requesting information for each message with a third-party service. Requests to an external service take time, which can slow the reading of the STDIN buffer, resulting in back pressure from the preceding command.

Additional models can be put in place to circumvent this issue. For example, if a store command took a more extended amount of time to write each record to a remote MySQL server. An internal asynchronous buffer can get written to an internal array called a stack, and all the messages are read from the STDIN buffer and pushed onto the stack.

The store command will need a subscribing handler function to read from the stack. The handler can then write to the slower MySQL server without creating backpressure to the preceding piped commands.

> Warning: Beware that memory is always a limitation.

Generally, the lesson to take away with stream backpressure is to experiment and adjust the settings until the stream runs smoothly.

More about backpreassuring in streams can be found (here)[https://nodejs.org/en/docs/guides/backpressuring-in-streams/].

## Tapjaw Metadata Command Decorators

Tapjaw metadata cmmand decorators define the properties required to register a command. Below is a list of available decorator methods.

Write each ***required*** and any ***optional*** methods on the lines prior to the class definition. For example:
```typescript
// ...
@TapjawMetadata.Command.Name('my-command')
// .. more @TapjawMetadata.Command definitions go here ...
export default class MyCommand extends ... {
```


### @TapjawMetadata.Command.***Name***(*string*) - **Required**

Specify the name of the command.
The name **must** not contain any spaces.

Generally, kebab case names are most common. For example: `my-api-name` will convert to `$ bin/run apis my-api-name`.

#### Example:
```typescript
@TapjawMetadata.Command.Name('my-command')
export default class MyCommand extends ... {
```

### @TapjawMetadata.Command.***Description***(*string*) - **Required**

Specify the description displayed in the commands help.

#### Example:
```typescript
@TapjawMetadata.Command.Description('my-command description')
export default class MyCommand extends ... {
```

### @TapjawMetadata.Command.***Action***(*callback*) - **Required**

Specify the action's closure function to run when a user executes the command.

The closure's parameters signature varies depending on whether any arguments have been defined with `@TapjawMetadata.Command.Arguments(...)` against the command.

Arguments ideally should be soft validated in the Action closure, with stateful validation occurring in the `run()` method.

In the example below, a single Argument gets set as `<caption>`, meaning that the first argument in the closures parameter signature must be `async (caption: string, ...)`. The order of the arguments must match between the `@TapjawMetadata.Command.Arguments(...)` declaration and the closure parameters signature.


#### Example:
```typescript
@TapjawMetadata.Command.Action(async (caption: string, options: MyCommandOptions): Promise<void> => {
    try {
        // Early non-stateful validation of the incoming arguments and options
        // can be performed here!

        // The stateful MyCommand is instantiated and run() is executed on the line below.
        // All arguments and options are passed to the run() method.
        await new MyCommand(new MyAdapter()).run({ caption }, options);
    } catch (error) {
        TapjawExample.getLogger().error(String(error));
    }
})
@TapjawMetadata.Command.Arguments(new Argument('<caption>', 'A caption')
default export class MyCommand extends ... {
    constructor(private readonly adapter: MyAdapter) {}
}
```



### @TapjawMetadata.Command.***Example***(*string*) - **Optional**

Optionally, specify the example string to appear when a user provides the `--help` option to the command.

#### Example:
```typescript
@TapjawMetadata.Command.Example('$ bin/importer apis my-api-command MyCaption -i uuid')
// ...
```
*... will parse to:*
```bash
$ bin/run apis my-api-command --help
Usage: run apis my-api-command [options]

My API command.

Examples:
  $ bin/importer apis my-api-command MyCaption -i uuid
```


### @TapjawMetadata.Command.***Arguments***(*Argument*, ..) - **Optional**

Specify arguments the user can input with the command. Multiple arguments are allowed.

> **Important**:
>
> The order of the arguments **must** match between the `@TapjawMetadata.Command.Arguments(...)` declaration and the `@TapjawMetadata.Command.Action(...)` closure parameters signature.


#### Example:
```typescript
// ...
@TapjawMetadata.Command.Arguments(
    new Argument('<property>', 'Property name of the TapjawMessage to compare against (jsonpath)'),

    // Required <...>
    new Argument('<matches>', 'The property value that should be matched'),

    // Optional [...]
    new Argument('[matches]', 'The property value that should be matched'),
)
default export class MyCommand extends ... {
    constructor(private readonly adapter: MyAdapter) {}
}
```

> **Note**:
>
> Please refer to Commander.js's Argument contract for further details.



### @TapjawMetadata.Command.***Options***(*Option*, ...) - **Optional**

Specify options the user can use with the command. Multiple options are allowed, but the flag values must be unique.

#### Example:
```typescript
// ...
@TapjawMetadata.Command.Options(
    {
        // Both "-s" and "--start" will be supported, a single flag is also possible.
        flags: '-s, --start',

        description: 'description for start',

        // optional - (default: undefined)
        defaultValue: false,

        // optional - (default: false)
        required: true
    },
    {
        // <name> must be provided with option, e.g: --name=jim or -n jim
        flags: '-n, --name <name>',

        description: 'description for name'
    },
    // ... more can be added
)
default export class MyCommand extends ... {
    constructor(private readonly adapter: MyAdapter) {}
}
```



## Decorator based command example

```typescript
// -- src/commands/apis/tapjaw-example.ts

import TapjawExampleAdapter from '../../adapters/tapjaw-example-adapter';
import ExampleTapjawMessage from '../../contracts/messages/example-tapjaw-message';
import BaseCommandFlags from '../../contracts/base-command-flags';
import { TapjawAdapterCallback, TapjawCommand, TapjawCommandArgs } from 'tapjaw-importer';
import BaseApiCommand from '../../contracts/base-api-command';
import { Argument } from 'commander';

interface TapjawExampleOptions extends BaseCommandFlags {
    limit: string;
}

@TapjawMetadata.Command.Name('tapjaw-example')
@TapjawMetadata.Command.Description('TapjawExample API Command')
@TapjawMetadata.Command.Example('$ bin/importer apis tapjaw-exampe MyCaption -i uuid')
@TapjawMetadata.Command.Arguments(new Argument('caption', 'A simple caption'))
@TapjawMetadata.Command.Action(
    async (caption: string, options: TapjawExampleOptions): Promise<void> => {
        try {
            await new TapjawExample(new TapjawExampleAdapter()).run({}, options);
        } catch (error) {
            TapjawExample.getLogger().error(String(error));
        }
    }
)
export default class TapjawExample extends BaseApiCommand {
    constructor(protected readonly adapter: TapjawExampleAdapter) {
        super();
    }

    protected getAdapterCallback(
        args: TapjawCommandArgs<string>,
        { importId }: TapjawExampleOptions
    ): TapjawAdapterCallback<ExampleTapjawMessage> {
        const adapter = this.adapter;

        return async function* (): AsyncGenerator<ExampleTapjawMessage> {
            yield* adapter.getMessages(importId);
        };
    }
}

```

## Non-decorator based command example

```typescript
// -- src/commands/tools/non-reflect-hello.ts

import { Argument, Command } from 'commander';
import displayExample from '../../modules/commander/display-example';
import { TapjawCommandArgs, TapjawToolCommand } from 'tapjaw-importer';
import BaseCommandFlags from '../../contracts/base-command-flags';

interface NonReflectHelloOptions extends BaseCommandFlags {
    name: string;
}

export default class NonReflectHello extends TapjawToolCommand<NonReflectHelloOptions> {
    constructor(private readonly stdout: NodeJS.WritableStream) {
        super();
    }

    public static register(program: Command): void {
        program
            .command('non-reflect-hello')
            .description('A NonReflectHello demo command')
            .addArgument(new Argument('caption', 'A simple caption'))
            .storeOptionsAsProperties(false)
            .option('-n, --name <string>', 'Add a name to the message')
            .on('--help', displayExample('$ bin/run tools non-reflect-hello "My super caption" --name="Sasha"'))
            .action(async (caption: string, options: NonReflectHelloOptions) => {
                try {
                    // @Note Perform light validation prior to running .run().
                    await new NonReflectHello(process.stdout).run(
                        { caption } as TapjawCommandArgs<string>,
                        options
                    );
                } catch (error) {
                    NonReflectHello.getLogger().error(String(error));
                }
            });
    }

    async run({ caption }: TapjawCommandArgs<string>, { name }: NonReflectHelloOptions): Promise<void> {
        this.stdout.write('Hello World...');

        if (name) {
            this.stdout.write(`${name} has something to say: `);
        }

        this.stdout.write(caption + '\n');

        return Promise.resolve();
    }
}

```
