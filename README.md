Tapjaw Importer
===============

Create your own stream of payload messages to STDOUT from any API.

<!-- toc -->
- [Tapjaw Importer](#tapjaw-importer)
- [Description](#description)
- [Install &amp; Usage](#install-amp-usage)
  - [1: Install Yeoman](#1-install-yeoman)
  - [2: Install Tapjaw Generator](#2-install-tapjaw-generator)
  - [3: Setup a new project](#3-setup-a-new-project)
- [Components](#components)
  - [Commands](#commands)
  - [Adapters](#adapters)
  - [Configs](#configs)
  - [Connectors](#connectors)
  - [Contracts](#contracts)
    - [TapjawMessage](#tapjawmessage)
  - [Iterables](#iterables)
    - [StdoutIterator](#stdoutiterator)
- [Examples](#examples)
<!-- tocstop -->

# Description

This is a utility framework which allows you to compose a command for connecting, querying and downloading
API responses, database records and other web service responses. The response is then unpacked and iterated into individual message containers which are piped to a STDOUT buffer as individual JSON messages separated by a `\n`.


![diagram](./resources/diagram.png "Tapjaw Diagram")

# Install & Usage

TapjawImporter is a library package which is used in conjunction with a project, if you wish to create a project and start using the TapjawImporter, you will need to install [Yeoman](https://github.com/yeoman/yo) and the [Tapjaw Generator](https://github.com/digidip/generator-tapjaw).

Before we start, it's recommended you [install yarn](https://yarnpkg.com/en/docs/install) in your development environment.

## 1: Install Yeoman

```bash
~ $> yarn global add yo
```

## 2: Install Tapjaw Generator

```bash
~ $> yarn global add generator-tapjaw
```

To make sure the TapjawGenerator is working, execute the following command to see if the help output is displayed.

```bash
~ $> yo tapjaw
Tapjaw Project Generator
$ yo tapjaw:adapter         Create a new adapter
$ yo tapjaw:config          Create a new configuration scope
$ yo tapjaw:command         Create a new command
$ yo tapjaw:connector       Create a new connector
$ yo tapjaw:message         Create a new message
$ yo tapjaw:new-project     Create a new project tree
```

## 3: Setup a new project

Firstly `cd` to your workspace or development directory.

```bash
~/workspace $> yo tapjaw:new-project
```

Follow the instructions issued by the generator command, once you've generated a new project, `cd` into the project directory and install the project's dependancies.

```bash
~/workspace/my-project $> yarn install
```

To make sure the project has been setup correctly, issue the following command:

```bash
~/workspace/my-project $> bin/run
```

You should see a similar output:

```bash
testing description

VERSION
  testing/0.1.0 darwin-x64 node-v10.16.0

USAGE
  $ testing [COMMAND]

COMMANDS
  help  display help for testing
```

You are now ready to start working on your project.

# Components

An explination of all the components used by the TapjawImporter and hints on how to implement their usage correctly.

The basic flow of a command is as follows:

- OCLIF *(`bin/run my-command`)*
    - **Command** *(Configure Adapter & Connectors, executes Adapter with required arguments)*
        - **Adapter** *(Executes injected Connector with necassary arguments for a single payload)*
            - **Connector** *(Queries/Requests response)*
                - Third Party API/DB/Service (Recieves a payload)
            - **Connector** *(Deliver payload to Adapter, optionally with features to convert from XML/CSV into JSON)*
        - **Adapter** *(Decode and yield each entity)*
        - **StdoutIterator** *(Convert the entity to JSON and output to STDOUT buffer)*

## Commands

Tapjaw proudly embraces [OCLIF](https://github.com/oclif/oclif) for the implementation of commands.

The basic `TapjawCommand` abstracts a number of the command's behaviours away from the developer, since Tapjaw operates in a predefined flow.

Scope:
* Command name
* Arguments
* Options
* Defining Adapters and Connectors
* Use command Options & Arguments to alter the parameters required for adapter calls.

## Adapters

Scope:
* Yielding a single TapjawMessage object.
* Interfaces with connectors.
* Manages pagination/cursor iterations in conjunction with the connector, connectors must be dumb and only perform a single request based on arguments which are prepared by the adapter.

## Configs

By default TapjawImporter will use the `.env` ([dotenv](https://github.com/motdotla/dotenv)) approach towards configuration. This allows for the creation of a `.env` file in your project directory, or the possibility to inject environment variables with an alternative method which then can still be read by your project without a `.env` file.  It's recommended to use the `.env` approach during development and then use an external setter of environmental variable in production.

## Connectors

The purpose of a connector is to allow an adapter to use different external services, so for example some third party APIs will have a RESTful or SOAP API. The _Connector Pattern_ allows us to create a two implementations with the same method signatures for the adapter to use. The developer then has the choice to switch between either connector and expect the adapter to operate seemlessly regardless of which connector is used.

## Contracts

This is where all the interfaces for Connectors and Messages are stored by default, you can also use this directory for specifying types and interfaces for your own logic.

### TapjawMessage

Each message (`TapjawMessage`) is composed of a payload without structural constaints, import date, identifier and a signature which is generated from the payload.

## Iterables

The Tapjaw Iterables primary purpose is to take the messages yielded by the Adapter and output each message to an external interface, for example the STDOUT buffer.

### StdoutIterator

The StdoutIterator is the default configured outputting mechanism, which will take each yielded message and convert into JSON and write it to the STDOUT buffer followed by a newline (`\n`). Using the STDOUT buffer allows you to pipe the JSON message into another program's STDIN buffer or append to a file.

# Examples

Please reference the [TapjawExample](https://github.com/digidip/tapjaw-example/).
