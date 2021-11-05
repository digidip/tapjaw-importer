Tapjaw Importer - v2.0.0
=========================

![diagram](./resources/diagram.png "Tapjaw Diagram")

Create your own stream of payload messages to STDOUT from any API.

<!-- toc -->
- [Tapjaw Importer - v2.0.0](#tapjaw-importer---v200)
- [Description](#description)
- [History](#history)
- [Why use Tapjaw Importer?](#why-use-tapjaw-importer)
- [Setup a new project](#setup-a-new-project)
- [Components](#components)
  - [Commands](#commands)
  - [Adapters](#adapters)
  - [Configs](#configs)
  - [Connectors](#connectors)
  - [Contracts](#contracts)
    - [TapjawMessage](#tapjawmessage)
  - [Iterators](#iterators)
- [Examples & Tutorial](#examples--tutorial)
- [Changelog](#changelog)
  - [v2.0.0](#v200)
  - [v1.2.0 (no longer supported)](#v120-no-longer-supported)
<!-- tocstop -->

# Description

Tapjaw Importer is written in Typescript as a JSON-based utility framework which has been purposefully designed to simplify the development of useful commands which can be chained together to consolidate data for persistance or further processing in the cloud or on your own infrastructure.

The chained commands communicate with JSON over a STDIO stream using a pre-defined class called a `TapjawMessage`, containsing some default metadata and a payload properties, allowing for easy extending from the `TapjawMessage` class based on the business rules of an implementation.

The `TapjawMessage` schema enables the creation of a standardised streaming paradigm with JSON delimited by newlines, using the Unix pipe syntax, e.g:-

```bash
$ bin/run apis my-network | bin/run filters remove-duplicates | bin/run stores s3 s3://my-bucket
```

In practice you would use one API command in conjunction with multiple filter commands, finishing with a store command to persist the result in an external location. If you wish to output to multiple store commands, you can employ a Tools command to boot up multiple child processes which can fan out to a number of store commands, please refer the example below for a psudo-example:

```bash
$ bin/run apis my-network | bin/run filters remove-duplicates | bin/run filters clean | bin/run tools fan "stores s3 s3://my-bucket" "stores sqs sqs://sqs-server/my-queue"
```

The project provides a number of additional useful features to decrease the complexity of:
- Access HTTP/API endpoints with Connectors (`TapjawConnector` & `TapjawHttpConnector`).
  - Security implementations for Bearer, Basic and OAuth authentication *(Session based authentication in the works!)*.
- Iterate seemlessly over multiple pages of response data using Adapters (`TapjawAdapter`).
- Parser tools to convert XML or CSV to JSON (`xmlToJson` & `csvToJson`).
- Strong focus on Typescript data typing, employing contracted interfaces through out the framework.
- Rate limiting of messages being pushed through a stream, from the API command.
- Each command type is has a base class designed for it's purpose, meaning you only need to write a minimal ammount of code.
- Date helper functions, providing a common toolkit which we've had to use in previous projects (using Luxon).
- A quick and simple .env configuration loading strategy (`DotEnvConfig`, *ref: `TapjawMessageConfig` for implementation*).
- Base `TapjawLogger` interface to allow easy implementation of your own logging library, the project includes two basic implementations, `ConsoleLogger` and `NullLogger`, which `NullLogger` is generally used in testing.

# History

This project was first devised in 2019 due to a requirement of needing to import data from across dozens of APIs,
each with unique data schemas, varied security infrastructures, request/responce strategies and general differences in appraoch.

We where initially inspired by the singer.io appraoch, which provides many API taps, although as an Affiliate Marketing company we couldn't rely on singer.io to have all the APIs we needed, so instead it was decided to create a framework which allows a powerful approach to extracting data and doing something useful with it.

We have now gone beyond what singer.io is designed to do, by employing filter and tool commands to chain as the developer or business sees fit in accomplishing the consolidation of data into minimal usable form for further processing.

We've successfully written and deployed into production four separate internal projects using this framework.


allowing for scalability horizontally, by allowing the developers to customise their.


 learned a lot of and are for ever striving to improve the framework

# Why use Tapjaw Importer?

1. You want a Typescript/Javascript framework for easily importing and consolidating data into your existing infrastructure.
2. Want to be able to easily create api, filter, store or tool commands to stream JSON-based messages from various APIs.
3. You need to be able to mix and match commands for your business purposes, removing code duplications by having strong layers between the specific command domains.
4. Want to be able to stream data to any other third party commands using STDIO, enabling to use of any other programming langauge to fill any missing gaps or limitations.
5. Not having to rely on a continous living process which manages communication with a third party API.
6. Easy to create or using existing infrastructure to configure and manage the running of importation commands.
7. Easy to implement data consolidation for cloud based serverless projects.
8. Easy to test individual commands separately.
9. An simple interface for creating streams of data between commands.

# Setup a new project

Firstly `cd` to your workspace or development directory.

```bash
~/workspace $> git clone "https://github.com/digidip/tapjaw-example.git#semver^2" my-project
```

> **Cauton**: Please make sue you're using Node version 16, you may use [`nvm`](https://github.com/nvm-sh/nvm) for managing your node versions.

Now install all the frameworks dependancies, if you're not using node 16, you will get encounter an error.

```bash
~/workspace/my-project $> yarn install
```

Build the project with:

```bash
~/workspace/my-project $> yarn tsc
```

To make sure the project has been setup correctly, issue the following command:

```bash
~/workspace/my-project $> bin/run
```

You should see a similar output:

```bash
Usage: run [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  apis <api>        Execute an API command
  filters <filter>  Execute a filter command
  stores <store>    Execute a store command
  tools <tool>      Execute a tool command
  help [command]    display help for command
```

You are now ready to start working on your project, refer to the `digidip/tapjaw-example`'s [README.md](https://github.com/digidip/tapjaw-example/blob/v2.0.0/README.md) for a tutorial on how to get get started.

# Components

An explination of all the components used by the Tapjaw Importer and hints on how to implement their usage correctly.

## Commands

Commands consist of four distinct types:
- [APIs](docs/api-commands.md) - Pull data using connectors & adapters, converting each record into a `TapjawMessage` and write to the stdout stream.
- [Filters](docs/filter-commands.md) - Filter out stdin stream messages, mutate a message, or forward messages to the stdout stream based on rules.
- [Stores](docs/store-commands.md) - Persist incoming stdin messages to an external service, such as dbms, s3 or a queue.
- [Tools](docs/tool-commands.md) - Additional useful commands which do not fit within the specification of previous three categories.

## Adapters

Adapters are used as an agnostic link between an API command and a connector, where the adapter implements the business logic on how to manage the responses from the connector and provide a `TapjawMessage` to the commmand to then be written to an output buffer.

Please refer to [Adapter documentation](./docs/adapters.md).

## Configs

By default Tapjaw Importer will use the `.env` ([dotenv](https://github.com/motdotla/dotenv)) approach towards configuration. This allows for the creation of a `.env` file in your project directory, or the possibility to inject environment variables with an alternative method which then can still be read by your project without a `.env` file.  It's recommended to use the `.env` approach during development and then use an external setter of environmental variable in production.

For more details please refer to [Configurations documentation](docs/configurations.md).

## Connectors

The purpose of a connector is to allow an adapter to use different external services, for example some third party APIs will have a RESTful or SOAP API. The _Connector Pattern_ allows us to create a two implementations with the same method signatures for the adapter to use. The developer then has the choice to switch between either connector and expect the adapter to operate seemlessly regardless of which ever connector is used.

Please refer to [Connectors documentation](./docs/connectors.md).

## Contracts

This is where all the interfaces for Connectors and Messages are stored by default, you can also extend from this directory for specifying types and interfaces for your own project.

Please refer to [Contracts documentation](./docs/contracts.md).

### TapjawMessage

Each message (`TapjawMessage`) is composed of a payload without structural constaints, import date, identifier and a *sha256* signature which is generated from the payload.

## Iterators

Tapjaw Iterators designed purpose is to iterate over the yielded messages provided by an Adapter and output each message to an external interface, tapjaw tends to write to the [standard output](https://en.wikipedia.org/wiki/Standard_streams) (stdout) stream. This can be overriden by extending the `OutputIterator` class or `TapjawIterator` interface.

Please refer to [Iterators documentation](./docs/iterators.md).



The reason Tapjaw Importer writes the STDOUT buffer, due to the Unix feature of chaining of commands. This can be achieved by "piping" commands together, for example:

```bash
$ cat /etc/hosts | grep localhost
127.0.0.1       localhost digidip.local
::1             localhost
```

Tapjaw Importer is shipped with two pre-implemented Iterators, both are detailed before:-


# Examples & Tutorial

Please reference the [TapjawExample](https://github.com/digidip/tapjaw-example/).

# Changelog

## v2.0.0
- Add date helper functions.
- Add standard Connector and Adapter errors.
- Typeguards.
- Update dependancies, ESLint and prettier.
- Add command (Commander) contracts for APIs, Filters, Stores and Tools.
-

## v1.2.0 (no longer supported)
- Convert from OCLIF to commander.
- Upgrade to Typescript 4.
