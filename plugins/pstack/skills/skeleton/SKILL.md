---
name: skeleton
description: Use when designing a change that crosses a function or module boundary, building something new, explaining a change already made, or when the user asks how part of a system works or wants to understand or simplify it. Puts the answer first, then the full model (types, signatures, rules, state machines, invariants, and who calls what), each part explained in plain words, on one page the user reads instead of the code.
---

# Skeleton

The user keeps their own model of each system while agents write the bodies. The skeleton page gives them that model, so they can understand a design or decide it without reading code.

## Rich and readable

This rule outranks every other in this skill. The page carries the whole model, and the reader understands every part of it cold.

- Open with the answer, in two to four plain sentences.
- Show the full model for each concept the work touches: its types, its function signatures, the rules it decides by, its state machine, its invariants, and who calls what. Copy each from the code; never shorten a signature or a type.
- Explain every technical part in plain words beside it: each field and variant of a type, each rule, each state, each node of a graph. A part the reader can't read is noise.
- Draw state machines and call paths as diagrams with arrows, never as lists of names.
- Define each term the reader may not know, and give each thing one name.
- Cut only what restates another part. Never add labels or toggles of your own.

## Modes

- **Design.** A change not built yet. Show the design you recommend, and ask only what the intent leaves open.
- **Explain.** A change already made, such as a pull request or a fix. Show what a person saw before, what they see now, the cause in between, and the model around the change.
- **Map.** A request to see how part of a system works, or to understand or simplify it. Show it as the code has it today, with findings.

## Steps

1. **Intent.** In design mode, write the goal in one sentence, what done means, what must never happen, and what is out of scope. Take it from the pitch when the **shape** skill wrote one. Otherwise draft it and have the user confirm it before you design against it. In explain mode, state the symptom the change fixes, as a person saw it. In map mode, state what the part is for, as the code shows it.
2. **Read the code.** Run the **how** skill on systems you don't know. Take types, signatures and call sites from the code, never from memory. Read each line before you cite it, and drop any claim you could not check.
3. **Model each concept the work touches.** Give it a purpose in one line, then each of these that exists: its types, with every field or variant explained; its functions, with full signatures; the rules it decides by, in the order the code checks them; its state machine, with what causes each transition and the transitions that must never happen; its invariants, each tagged with how it is enforced, strongest first (law, such as Bend 2's `LAWS.bend`; type; database; test; model check; repair job; nothing), with the test or file that enforces it; and its constraints. Mark what the work adds or changes, and give the old value of a changed part. Mark any invariant the code breaks today.
4. **Decide what the intent settles.** In design mode, drop each candidate that breaks a "never" or misses "done means", and give the reason in one line. For each question the intent leaves open, give a pick, its reason, and a comparison on measures that let the user decide correctly.
5. **Add findings in map mode** where the model is more complex than the domain: a concept with several purposes, state that copies other state, an invariant nothing enforces, one piece of state with several writers, or a state nothing reaches. Give each the simplest fix and its cost.
6. **Draw who calls what:** the people who act, the functions and routes they reach with their signatures, the outside systems, and the stores. Draw one graph per user action, so each stays narrow enough to read.
7. **Build the page** from [`references/page.html`](references/page.html). Copy it to a scratch folder and replace only the JSON in its `skeleton-data` block. Check the rendered page at the width it will be read at, fix any part that is cut off or unreadable, then show it beside the conversation when the host can render HTML and give the file's path. Put the answer in your reply as well.

## Blocks

The page is a list of blocks, rendered in the order you give them. The answer comes first.

| Block | Holds | Use it for |
|---|---|---|
| `answer` | `text` | Every page, first |
| `compare` | `columns: [{label, items}]`, optional `pick` (column index) | Before and after, or two options side by side |
| `intent` | `goal`, `done`, `never`, `out` | Design mode |
| `decision` | `question`, `why`, `options`, `pick`, `reason`, `measures: [{label, values}]` | One open question each |
| `graph` | `nodes: [{id, label, signature, does, kind, mark}]`, `edges: [{from, to, label}]` | Who calls what. `kind` is `actor`, `outside`, or `store`; omit it for our code |
| `concept` | `name`, `purpose`, `mark`, and any of `types`, `functions`, `rules`, `machine`, `invariants`, `constraints` | Each concept the work touches |
| `machine` | `states: [{id, label, means, end, refused}]`, `transitions: [{from, to, when, never, mark}]` | A state machine outside a concept |
| `rules` | `title`, `order`, `rows: [{if, then, mark, before}]` | Rules outside a concept |
| `findings` | `items: [{text, fix}]` | Map mode |
| `terms` | `items: [{term, means}]` | Every term the reader may not know |
| `sources` | `items` of `file:line` strings | Where the claims come from |
| `flow` | `steps: [{label, detail, mark}]` | A short linear sequence with no signatures |
| `svg` | `ref`, the id of a `<template>` holding the SVG | A diagram no other block can draw |
| `note` | `text` | A warning the reader must not miss |

Inside a concept, `types` is a list of `{code, notes: [{name, means, mark, before}], mark, before}`, `functions` is a list of `{signature, does, mark, before}`, `rules` and `machine` take the shapes above, and `invariants` is a list of `{text, enforced, where, broken, mark}`. `mark` is `new` or `changed`, and `before` holds the old value of a changed part. Wrap code in backticks inside any text, and the page renders it as code. The page lays out graphs and state machines with ELK from jsDelivr, and lists their edges as text when it can't load.

## Limits

- Check invariants against data only in a copy that serves no traffic. Never query a live database to check one.
- Revise the same page as the design moves, and say in a line what changed.
