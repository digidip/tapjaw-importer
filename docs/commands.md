# Commands

## TapjawCommand decorators

TapjawCommand decorators define the attributes required to register a command. Below is a list of available decorator methods.

Write each required and any optional methods on the lines preceding the class definition. For example:
```typescript
// ...
@TapjawCommand.Name('my-command')
// .. more @TapjawCommand definitions go here ...
export default class MyCommand extends ... {
```


### @TapjawCommand.*Name*(*string*) - **Required**

Specify the name of the command.
The name **must** not contain any spaces.

Generally, kebab case names are most common. For example: `my-api-name` will convert to `$ bin/run apis my-api-name`.


### @TapjawCommand.*Description*(*string*) - **Required**

Specify the description displayed in the commands help.


### @TapjawCommand.*Action*(*callback*) - **Required**

Specify the action (as a callback) to run when a user executes the command.

```typescript
@TapjawCommand.Action(async (caption: string, options: MyCommandOptions): Promise<void> => {
    try {
        // Early non-stateful validation of the incoming arguments and options
        // can be performed here!

        // The stateful command is instaniated and exeuted on the line below.
        // Valid arguments and options can be forwarded to the run() method.
        await new MyCommand(new MyAdapter()).run({ caption }, options);
    } catch (error) {
        TapjawExample.getLogger().error(String(error));
    }
})
default export class MyCommand extends ... {
    constructor(private readonly adapter: MyAdapter) {}
}
```


### @TapjawCommand.*Example*(*string*) - **Optional**

Optionally, specify the example string to appear when a user provides the `--help` option to the command.
For example:
```typescript
@TapjawCommand.Example('$ bin/importer apis my-api-command MyCaption -i uuid')
// ...
```
... will parse to:
```bash
$ bin/run apis my-api-command --help
Usage: run apis my-api-command [options]

My API command.

Examples:
  $ bin/importer apis my-api-command MyCaption -i uuid
```


### @TapjawCommand.*Arguments*(*Argument*, ..) - **Optional**

### @TapjawCommand.*Options*(*Option*, ...) - **Optional**

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

@TapjawCommand.Name('tapjaw-example')
@TapjawCommand.Description('TapjawExample API Command')
@TapjawCommand.Example('$ bin/importer apis tapjaw-exampe MyCaption -i uuid')
@TapjawCommand.Arguments(new Argument('caption', 'A simple caption'))
@TapjawCommand.Action(async (caption: string, options: TapjawExampleOptions): Promise<void> => {
    try {
        await new TapjawExample(new TapjawExampleAdapter()).run({}, options);
    } catch (error) {
        TapjawExample.getLogger().error(String(error));
    }
})
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
