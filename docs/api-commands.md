# Commands - API

The basic flow of an API command is as follows:

- API command *(`bin/run apis <my-command>`)*
    - **Command** *(Configure Adapter & Connectors, executes Adapter with required arguments)*
        - **Adapter** *(Executes injected Connector with necassary arguments for a single payload)*
            - **Connector** *(Queries/Requests response)*
                - Third Party API/DB/Service (Recieves a payload)
            - **Connector** *(Deliver payload to Adapter, optionally with features to convert from XML/CSV into JSON for `TapjawMessage.payload`)*
        - **Adapter** *(Decode and yield each `TapjawMessage`)*
        - **StdoutIterator** *(Convert the `TapjawMessage` to JSON and output to STDOUT buffer)*
