# Adapters

## Scope

* Yielding a single `TapjawMessage` object in a loop.
* Interfaces between connectors and commands.
* Manages pagination/cursor iterations in conjunction with the connector, connectors must be dumb and only perform a single request based on arguments which are prepared by the adapter.
