---
name: principle-boundary-discipline
description: "Apply when wiring validation, error handling, or framework adapters. Concentrate guards at system boundaries (CLI, config, network, external APIs); trust internal types and keep business logic in pure functions."
user-invocable: false
---

# Boundary Discipline

Validate, narrow types, and handle errors where data crosses a system boundary (CLI args, config files, external APIs, network). Inside, trust the types: no re-validation and no redundant nil checks. Parse raw data into domain types at the boundary, and keep transport and framework types out of the public surface. Business logic lives in pure functions with no framework dependencies. The shell that calls them is thin.

Two tests. Is this data crossing a boundary right now? If not, the validation is redundant. Can this be a pure function the shell just calls? If yes, extract it.

Classify dependencies before adding a port or adapter:
- **In-process logic:** keep direct; no adapter.
- **Local-substitutable** (in-memory DB/FS, local store): substitute inside the module; no external port.
- **Remote-but-owned service:** define a port with a real transport adapter and an in-memory test adapter.
- **True external dependency:** inject a thin port at the boundary and mock only there.

One adapter is a hypothetical boundary; two real implementations earn a port.
