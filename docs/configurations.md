# Tapjaw Importer Configurations

A dotenv (.env) loader is shipped by default with Tapjaw Importer, although we've simplified the process even further by providing the `tapjaw-importer/src/configs/dot-env-config.ts` class. This allows for scoping groups of configuration values based on configuration name prefixes, please see below to learn how to use it.

For more information regarding env and `.env` implementations, please read:
- https://en.wikipedia.org/wiki/Env
- https://github.com/motdotla/dotenv
- https://nodejs.org/dist/latest/docs/api/process.html#processenv

## .env & default.env

The project by default contains a `default.env`, this file ideally needs to be copied and rename to `.env` in the root of your project, the dotenv library will then automatically find the file and load all the configurations into NodeJS `process.env` object.

If dotenv cannot find a `.env` file, no errors will be thrown, although your configuration classes will throw a lot of errors due the lack of available configurations.

The `dot-env-config` class will ONLY read all the available configurations stored inside `process.env` object, allowing for direct injections into this object via other means.

## Brief overview

When setting up a project, copy the `tapjaw-importer/default.env` from Tapjaw Importer and place it into your own project, if you're using the tapjaw-example, this should already been done for you.

You will see that the `default.env` contains two predefined configurations:
- `TAPJAW_MESSAGE_SHA256_SECRET=<string>`
- `TAPJAW_RATE_LIMITED_MSG_PER_MIN=<number>`

Tapjaw Importer includes one config loader, generally reserved for Tapjaw related configrations. It can be found at `tapjaw-importer/src/configs/tapjaw-config.ts`, which is responsible for loading all configurations from the `.env` file where the configuration prefix starts with `TAPJAW_`, in our example this means when ever you use `tapjawConfig.getConfig(...)`, it will only be able to access the two configurations specified above, in this example `tapjawConfig.getConfig('MESSAGE_SHA256_SECRET')` and `tapjawConfig.getConfig('RATE_LIMITED_MSG_PER_MIN')` are available.

To get the SHA 256 secret from the configuration, write and execute:
```typescript
import { tapjawConfig } from 'tapjaw-importer';
const secret = tapjawConfig.getConfig('MESSAGE_SHA256_SECRET'); // Returns the stored value in TAPJAW_MESSAGE_SHA256_SECRET
// ...
```

To provide more configurations which are accessible using `tapjawConfig`, create any number of configurations in the `.env` file which are prefixed with `TAPJAW_`.

The schema is: `<PREFIX TO SCOPE><CONFIGURATION NAME>=<VALUE>`

## Creating a new scoped configration

```typescript
import DotEnvConfig from './dot-env-config';

class ExampleConfig extends DotEnvConfig {
    constructor() {
        super('A useful name', 'EXAMPLE_PREFIX_');
    }
}

export default new ExampleConfig();
```

1. Create a new file at `tapjaw-importer/src/configs/...`, using the example above we will call it `example-config.ts`, which is the standard we use for file naming.
2. Copy over the above example into your new class file, where the class name should match the file name in camel-case: `ExampleConfig`.
3. Update the `super(..., ...)` with a useful name and also the prefix which will scope the configrations to this configuration class.
4. Make sure that the class is being instantiated after the `export default` clause, this allows instant usage without have to instantiate the class each time you need it.
5. Go to you `default.env` and `.env` and add in one or more configurations with the new prefix, for example `EXAMPLE_PREFIX_VERSION=1.0`, then save and move to the next step.
6. Now you will be able to perform the following:
   ```typescript
   import exampleConfig from './configs/example-config';

   // version should aqcuire the value `1.0`.
   const version = exampleConfig.getConfig('version');
   ```

## Production usage

Generally in production we do not use the `.env` approach, instead we make sure that the unix `env` already has the values stored. With AWS services or Docker containers this can be easily done by providing the values directly via their corresponding configurations or user interface inputs.

Please refer to your relavent infrastruture documentation on how to inject enviromental variables safely.

Of course you can also use the `.env` approach in production, although it's **not recommended**, as it potentially allows sensative data to be store on the file system where you project is held, this could be considered a serious security breach in some situations.
