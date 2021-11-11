# Tapjaw Importer Configurations

A dotenv (.env) loader is shipped by default with Tapjaw Importer, although we've simplified the process further by providing the `tapjaw-importer/src/configs/dot-env-config.ts` Class. DotEnvConfig abstracts scoping groups of configuration values based on configuration name prefixes. Please see below to learn how to use it.

For more information regarding env and `.env` implementations, please read:
- https://en.wikipedia.org/wiki/Env
- https://github.com/motdotla/dotenv
- https://nodejs.org/dist/latest/docs/api/process.html#processenv

## .env & default.env

By default, Tapjaw Importer contains a `default.env` file, and this file ideally needs to be copied and renamed to `.env` at the root of your project. The dotenv library will automatically find the file and load all the configurations into the NodeJS `process.env` object.

If dotenv cannot find a `.env` file, no errors will occur, although your configuration classes will throw many error messages due to the lack of available configurations.

The `dot-env-config` Class will **only** read all the available configurations stored inside the `process.env` object, allowing direct injections into this object via other means.

## Brief overview

When setting up a project, copy the `tapjaw-importer/default.env` from Tapjaw Importer and place it into your project. If you are using the `tapjaw-example`, the file will already exist.

You will see that the `default.env` contains two predefined configurations:
- `TAPJAW_MESSAGE_SHA256_SECRET=<string>`
- `TAPJAW_RATE_LIMITED_MSG_PER_MIN=<number>`

Tapjaw Importer includes one config loader, generally reserved for Tapjaw related configurations. Located at `tapjaw-importer/src/configs/tapjaw-config.ts`, which is responsible for loading all configurations from the `.env` file where the configuration prefix starts with `TAPJAW_`. In our example this means whenever you use `tapjawConfig.getConfig(...)`, it will only be able to access the two configurations specified above, in this example `tapjawConfig.getConfig('MESSAGE_SHA256_SECRET')` and `tapjawConfig.getConfig('RATE_LIMITED_MSG_PER_MIN')` are available.

To get the SHA 256 secret from the configuration, write and execute:
```typescript
import { tapjawConfig } from 'tapjaw-importer';
const secret = tapjawConfig.getConfig('MESSAGE_SHA256_SECRET'); // Returns the stored value in TAPJAW_MESSAGE_SHA256_SECRET
// ...
```

To provide more values that are accessible using `tapjawConfig`, create any number of configurations in the `.env` file. These configuration values are all prefixed with `TAPJAW_`.

The schema is: `<PREFIX TO SCOPE><CONFIGURATION NAME>=<VALUE>`.

## Creating a new scoped configuration

```typescript
import DotEnvConfig from './dot-env-config';

class ExampleConfig extends DotEnvConfig {
    constructor() {
        super('A useful name', 'EXAMPLE_PREFIX_');
    }
}

export default new ExampleConfig();
```

1. Create a new file at `tapjaw-importer/src/configs/...`; using the example above, we will call it `example-config.ts`, which is the standard we use for file naming.
2. Copy over the above example into your new class file, where the class name should match the file name in camel-case: `ExampleConfig`.
3. Update the `super(..., ...)` with a good name and the prefix that will scope the configurations to this configuration class.
4. Make sure that the Class gets instantiated after the `export default` clause. Allowing for instant usage without having to instantiate the Class each time you need it.
5. Go to you `default.env` and `.env` and add in one or more configurations with the new prefix, for example `EXAMPLE_PREFIX_VERSION=1.0`, then save and move to the next step.
6. Now, you will be able to perform the following:
   ```typescript
   import exampleConfig from './configs/example-config';

   // version should aqcuire the value `1.0`.
   const version = exampleConfig.getConfig('version');
   ```

## Production usage

Generally, in production, we do not use the .env approach. Instead, we make sure that the Unix env already has the values stored. When using AWS services or Docker containers, provide the values directly in their corresponding configurations or user interface inputs.
Please refer to the appropriate infrastructure documentation on how to inject environmental variables safely.

Of course, the .env file can get used in production. However, it is recommended against, as it potentially allows sensitive data to be accessible on the file system where the project gets hosted. Such behaviour could be considered a severe security breach in some situations.
