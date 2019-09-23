Tapjaw Importer
===============

Create your own stream of payload messages to STDOUT from any API.

<!-- toc -->
- [Tapjaw Importer](#tapjaw-importer)
- [Description](#description)
- [Usage](#usage)
- [Command](#command)
- [Adapter](#adapter)
- [Connector](#connector)
- [Contracts](#contracts)
- [Iterables](#iterables)
- [Examples](#examples)
<!-- tocstop -->

# Description

This is a utility framework which allows you to simply build a command for connecting to any type of
API. The API response is then iterated into individual message containers which are piped to the STDOUT
buffer as individual JSON objects.

![diagram](./resources/diagram.png "Tapjaw Diagram")

# Usage

```sh
$ bin/tapjaw build <name>
```

# Command

Tapjaw proudly embraces [OCLIF](https://github.com/oclif/oclif)

Scope:
* Command name
* Arguments
* Options

# Adapter

Scope:
* A single TapjawMessage object
* Interface to API endpoints

# Connector

Scope:
* Connection to an API protocol type
*

# Contracts

# Iterables

# Examples

```typescript
// command

class ExampleApiCommand extends TapjawCommand {
    static
}

```
