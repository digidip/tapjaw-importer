Tapjaw Importer - v2.0.0
=========================

![diagram](./resources/diagram.png "Tapjaw Diagram")

Create a stream of payload messages to STDOUT from any API.

<!-- toc -->
- [Tapjaw Importer - v2.0.0](#tapjaw-importer---v200)
- [Description](#description)
- [Purpose](#purpose)
- [Documentation](#documentation)
- [Why use Tapjaw Importer?](#why-use-tapjaw-importer)
- [Dependancies](#dependancies)
- [Setup a new project](#setup-a-new-project)
- [Components](#components)
  - [Commands `TapjawCommand`](#commands-tapjawcommand)
  - [Adapters `TapjawContract.TapjawAdapter`](#adapters-tapjawcontracttapjawadapter)
  - [Authenticators `TapjawAuthenticator`](#authenticators-tapjawauthenticator)
  - [Configs `TapjawConfig`](#configs-tapjawconfig)
  - [Connectors `TapjawConnector`](#connectors-tapjawconnector)
  - [Contracts `TapjawContract`](#contracts-tapjawcontract)
  - [TapjawMessage `TapjawMessage`](#tapjawmessage-tapjawmessage)
  - [Iterators `TapjawIterator`](#iterators-tapjawiterator)
  - [Dates `TapjawDate`](#dates-tapjawdate)
- [Examples & Tutorial](#examples--tutorial)
- [Changelog](#changelog)
  - [v2.0.0](#v200)
  - [v1.2.0 *(no longer supported)*](#v120-no-longer-supported)
  - [Previous versions](#previous-versions)
<!-- tocstop -->

# Description

Tapjaw Importer is a Typescript JSON-based utility framework purposefully designed to simplify the development of commands that get chained together to consolidate data for persistence or further processing in the cloud or on existing system infrastructure.

The chained commands communicate with JSON over an STDIO stream using a pre-defined class called a `TapjawMessage.TapjawMessage`, containing some default metadata and payload properties, allowing for easy extending from the `TapjawMessage.TapjawMessage` Class based on the business rules of implementation.

The `TapjawMessage.TapjawMessage` schema enables the creation of a standardised streaming paradigm with JSON delimited by newlines, using the Unix pipe syntax, e.g.:-

```bash
$ bin/run apis my-network | bin/run filters remove-duplicates | bin/run stores s3 s3://my-bucket
```

In practice, one API command gets used in conjunction with multiple filter commands, finishing with a store command to persist the result in an external location.

To stream a single output into several store commands, create a Tools command to boot up multiple child processes and fan out to the multiple store commands. Please refer to the example below for a pseudo-example:

```bash
$ bin/run apis my-network | bin/run filters remove-duplicates | bin/run filters clean | bin/run tools fan "stores s3 s3://my-bucket" "stores sqs sqs://sqs-server/my-queue"
```

The project provides several additional useful features to decrease the complexity of:
- Access HTTP/API endpoints with Connectors (`TapjawConnector.TapjawDefaultConnector`).
  - Security implementations for Bearer, Basic, JWT and OAuth authentication.
- Iterate seamlessly over multiple pages of response data using Adapters (`TapjawContract.TapjawAdapter`).
- Parser tools to convert XML or CSV to JSON (`TapjawParser.xmlToJson` & `TapjawParser.csvToJson`).
- Strong focus on Typescript data typing, employing contracted interfaces throughout the framework.
- Rate limiting of messages getting emitted through a stream from any API command.
- Each command type is has a base class designed for its purpose, requiring a minimal amount of code to achieve a workable command.
- Date helper functions, providing a common toolkit that we have found useful in previous projects (using Luxon).
- A quick and simple .env configuration loading strategy with `TapjawConfig.DotEnvConfig`, featuring the ability to namespace groups of configurations.
- Base `TapjawContract.TapjawLogger` interface to allow easy implementation of your logging library. The project includes two basic implementations, `ConsoleLogger` and `NullLogger`, which `NullLogger` is generally used in testing.

# Purpose

Tapjaw Importer started life in 2019 due to a requirement of needing to import data from across dozens of APIs into a consistent internal schema,
each API has unique data schemas, various security infrastructures, request/response strategies and general differences in approach.

Tapjaw Importer's inspiration comes from the singer.io approach, which provides many API taps and targets. However, as an Affiliate Marketing company, we could not rely on singer.io to have all the APIs we needed. Instead, we created this framework that provides a more diverse approach to extracting data and doing something useful with it.

Tapjaw Importer provides a more abstract approach than singer.io by employing customisable API, filter, store and tool commands.

As a developer, system administrator or operations manager, it is possible to chain together as many commands as needed to fulfil a business models requirements.

As the developer, little concern is necessary with how data traverses through the commands since Tapjaw Importer supplies abstract command types to complete the task quickly and easily.

[digidip GmbH](https://www.digidip.net) has successfully written and deployed four separate internal projects into production using this framework, allowing us to experience such a process's complexities. The project attempted to provide the necessary components to set up a command and data stream quickly.

# Documentation

The overview documentation in the `docs/markdown/` directory, the latest [API documentation](https://digidip.github.io/tapjaw-importer/) is also available.


# Why use Tapjaw Importer?

1. Require node.js for setting up ingestion pipelines.
2. Require a framework to quickly create API commands to stream each record to a STDOUT buffer.
3. Be able to mix and match commands for business purposes demands quickly.
4. Slots in easily into existing system infrastructure.
5. The ability to create a custom toolkit of bespoke scalable commands.
6. Easy to implement data consolidation for cloud-based serverless projects.
7. An simple interface for creating streams of data between commands.

# Dependancies

- Node JS v16
- Commander.js
- reflect-metadata
- Typescript 4
- Unix based operating system (it might work in Windows, but compatibility can be assured)

# Setup a new project

Firstly, execute `cd` to your workspace or development directory.

```bash
~/workspace $> git clone "https://github.com/digidip/tapjaw-example.git#semver^2" my-project
```

> **Caution**: Please make sure the host system is using Node version 16. A package such as [`nvm`](https://github.com/nvm-sh/nvm) may help manage your node versions during development.

Install all the frameworks dependencies. If the host system is not configured with at least node version 16, `yarn` will throw an error.

```bash
~/workspace/my-project $> yarn install
```

Build the project with:

```bash
~/workspace/my-project $> yarn tsc
```

To validate the project, issue the following command:

```bash
~/workspace/my-project $> bin/run
```

After the command completes, the following out should be displayed:

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

The project should now be up and running.

Please refer to  `digidip/tapjaw-example`'s [README.md](https://github.com/digidip/tapjaw-example/blob/v2.0.0/README.md) for a tutorial on how to get get started.

# Components

An overview of each component available in Tapjaw Importer, focusing on each element with corresponding documentation in how to implement, extend and use correctly.

## Commands `TapjawCommand`

Commands are the defined set of entry points in a project. Commands consist of four distinct types in Tapjaw Importer, each with a specific domain. Read the listed documentation links below to overview how commands get configured and which command get used, for what purpose.

- [Commands overivew](docs/markdown/commands.md) - Overview of what is necessary to create a command.
- [API commands](docs/markdown/api-commands.md) - Pull data using connectors & adapters, converting each record into a `TapjawMessage` and write to the stdout stream.
- [Filter commands](docs/markdown/filter-commands.md) - Filter out stdin stream messages or forward messages to the stdout stream based on rules.
- [Store commands](docs/markdown/store-commands.md) - Persist incoming stdin messages to an external service, such as DBMS, s3 or a queue.
- [Tool commands](docs/markdown/tool-commands.md) - Additional commands which do not fit within the specification of the previous three categories, for example, mutating a message.

## Adapters `TapjawContract.TapjawAdapter`

Adapters are the agnostic link between an API command and a connector. The adapter implements the business logic on managing the responses from the connector and yields a `TapjawMessage` to the command to then be written to an output buffer.

Please refer to [Adapter documentation](./docs/markdown/adapters.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawContract.html#TapjawAdapter) for further details.

## Authenticators `TapjawAuthenticator`

Tapjaw Importer supplies four widely used authentication approaches, and these authenticators get injected into the constructor of any `TapjawConnector` extended class.

The Basic, Bearer and optionally JWT authenticators use specific string values to function.
The OAuth and optionally the JWT authenticators perform requests to an initial login API to gain their respective access tokens.

Currently supported Authenticators:
- Basic Authentication.
- Bearer Authentication.
- OAuth Authentication.
- JWT Authentication.

Please refer to [Authenticator documentation](./docs/markdown/authenticators.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawAuthenticator.html) for further details.

## Configs `TapjawConfig`

By default Tapjaw Importer will use the `.env` ([dotenv](https://github.com/motdotla/dotenv)) approach towards configuration. Dotenv allows for creating a `.env` file in your project directory or the possibility to inject environment variables with an alternative method that your project can still read without a `.env` file. Ideally, the `.env` approach during development and then use an external setter of environmental variables in production.

Please refer to [Configurations documentation](./docs/markdown/configurations.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawConfig.html) for further details.

## Connectors `TapjawConnector`

The purpose of a connector is to allow an adapter to use different external services. For example, some third party APIs will have a RESTful or SOAP API. The _Connector Pattern_ will enable us to create two implementations with identical method signatures for the adapter to use. The developer then chooses to switch between either connector and expect the adapter to operate seamlessly regardless of whichever connector is in use.

Please refer to [Connectors documentation](./docs/markdown/connectors.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawConnector.html) for further details.

## Contracts `TapjawContract`

The interfaces for Adapters and associated types and Loggers get stored under the `TapjawContract` namespace. Use these contracts to implement a commonly understood interface across a Tapjaw Importer implemented project.

Please refer to [Contracts documentation](./docs/markdown/contracts.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawContract.html) for further details.

## TapjawMessage `TapjawMessage`

Each message (`TapjawMessage`) is composed of a payload without structural constraints, import date, identifier and a *sha256* signature generated from the Payload.

Please refer to [TapjawMessage documentation](./docs/markdown/messages.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawMessage.html) for further details.

## Iterators `TapjawIterator`

Tapjaw Iterators designed purpose is to iterate over the yielded messages provided by an Adapter and output each to an external interface. Tapjaw Importer tends to write to the [standard output](https://en.wikipedia.org/wiki/Standard_streams) (stdout) stream.

It is possible to output to an interface other than stdout, the `OutputIterator` class, and the `TapjawIterator` contract is agnostic to an output interface.

Please refer to [Iterators documentation](./docs/markdown/iterators.md) or [API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawIterator.html) for further details.


## Dates `TapjawDate`

Tapjaw Importer provides a supporting Date/Time toolkit containing methods and constants to make the most commonly used functions available for quickly formatting or parsing dates and times.

More details on the functions and constants are available in the [TapjawDate API documentation](https://digidip.github.io/tapjaw-importer/modules/TapjawDate.html).

# Examples & Tutorial

Reference the [Tapjaw Example v2.0](https://github.com/digidip/tapjaw-example/blob/v2.0.0) for an example on implementing a project.

# Changelog

The project employs the [semver](https://semver.org/) specification on versioning.

## v2.0.0
- Add date helper functions.
- Add standard Connector and Adapter errors.
- Typeguards.
- Update dependencies, ESLint and prettier.
- Add command contracts for APIs, Filters, Stores and Tools.
- Fix legacy typescript issues.
- Standardise the JSON parsing of `TapjawMessage`.
- Abstract streaming management in filter/store command contracts.
- Documentation.
- Implement the npm package publishing (#TODO).
- Implements reflect-metadata, added `@TapjawMetadata.Command.*` and `@TapjawMetadata.Connector.*` decorator methods for configuring commands and connectors, [read more](docs/markdown/commands.md#tapjaw-metadata-command-decorators).
- Renamed AdapterError to TapjawAdapterError.
- Renamed ConnectorError to TapjawConnectorError.
- Namespaced each module of the framework, src/index.ts export interface improved.
- Move TapjawMessage out of contracts into src/messages.
- Move TapjawCommand derived classes moved out of contracts into src/commands.

## v1.2.0 *(no longer supported)*
- Convert from OCLIF to Commander.js.
- Upgrade to Typescript 4.

## Previous versions
- Here be dragons.
