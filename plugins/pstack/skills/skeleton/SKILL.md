---
name: skeleton
description: Use when designing a change that crosses a function or module boundary, building something new, explaining a change already made, or when the user asks how part of a system works or wants to understand or simplify it. Opens with the intent, then lays out the source itself (types, signatures, the changed lines as a diff) with a plain-words note beside each line, plus actions, state machines, invariants, and who calls what, on one page the user reads instead of the code.
---

# Skeleton

The user keeps their own model of each system while agents write the bodies. The skeleton page is the design itself, laid out so the user can reason about it and decide it without reading the bodies.

## Signal over noise

This rule outranks every other in this skill. Every element must help the user understand the design or make a decision.

- Signal: the intent, the code's own types, signatures and changed lines, the rules, the state machines, the invariants, and who calls what. Show all of it the work touches. Copy it from the code; never shorten a signature or a type.
- Noise: a part the reader can't read cold, a label you invented, a toggle for a decided option, and a part that restates another.
- Use the code's names: its types, functions, states and columns. Never rename them. Explain each in plain words beside it, and define each domain term in `terms`.
- Put the source first and the explanation on the same line beside it, so the reader's eyes stay on the code. Show a change as diff lines in place, old line above new.
- Draw state machines and call paths as diagrams with arrows, never as lists of names.

## Modes

- **Design.** A change not built yet. Show the design you recommend, and ask only what the intent leaves open.
- **Explain.** A change already made, such as a pull request or a fix. Show the change in the source and the model around it.
- **Map.** A request to see how part of a system works, or to understand or simplify it. Show it as the code has it today, with findings.

## Steps

1. **Intent, first on every page.** The goal in one sentence, who is involved, what done means, what must never happen, and what is out of scope. In design mode, take it from the pitch when the **shape** skill wrote one; otherwise draft it and have the user confirm it before you design against it. In explain mode, the goal is the one-sentence answer, and `text` says in plain words what a person saw before and sees now. In map mode, the goal is what the part is for, as the code shows it.
2. **Read the code.** Run the **how** skill on systems you don't know. Take types, signatures, states and call sites from the code, never from memory. Read each line before you cite it, and drop any claim you could not check.
3. **Model each concept the work touches**, after Jackson's concept design. Give each:
   - its purpose in one line, and its operational principle: the one-line story of how a person uses it;
   - its source: the types that hold its state and the functions that act on it, with a note beside each field, variant and decisive line. Where the work changes code, show the real lines, with removed and added lines in place;
   - its actions: what triggers each, its effects on state and outside systems, and whether it is all or nothing;
   - its state machine, with the code's state names, what causes each transition, the transitions that must never happen, and the ones planned but not built;
   - its invariants, each tagged with what enforces it, strongest first: law (such as Bend 2's `LAWS.bend`), type, database, test, model check, repair job, convention. Give the test or file that enforces it. The page highlights convention-only invariants; mark any the code breaks today as broken;
   - its constraints.
4. **Decide what the intent settles.** In design mode, drop each candidate that breaks a "never" or misses "done means", and give the reason in one line. For each question the intent leaves open, give a pick, its reason, and a comparison on measures that let the user decide correctly.
5. **Add findings in map mode** where the model is more complex than the domain: a concept with several purposes, state that copies other state, an invariant nothing enforces, one piece of state with several writers, or a state nothing reaches. Give each the simplest fix and its cost.
6. **Draw who calls what:** the people who act, the functions and routes they reach, the outside systems, and the stores. Give each box of our code its full signature, what it does, what the work changes in it, any warning, and its `file:line`. Draw one graph per user action, so each stays narrow enough to read.
7. **Build the page** from [`references/page.html`](references/page.html). Copy it to a scratch folder and replace only the JSON in its `skeleton-data` block. Check the rendered page at the width it will be read at, fix any part that is cut off or unreadable, then show it beside the conversation when the host can render HTML and give the file's path. Put the intent's goal in your reply as well.

## Blocks

The page is a list of blocks, rendered in the order you give them. The intent comes first.

| Block | Holds | Use it for |
|---|---|---|
| `intent` | `goal`, `text`, `who`, `done`, `never`, `out` | Every page, first |
| `compare` | `columns: [{label, items}]`, optional `pick` (column index) | Two designs side by side |
| `decision` | `question`, `why`, `options`, `pick`, `reason`, `measures: [{label, values}]` | One open question each |
| `graph` | `nodes: [{id, label, signature, does, change, warn, at, kind, mark}]`, `edges: [{from, to, label}]` | Who calls what. `kind` is `actor`, `outside`, or `store`; omit it for our code |
| `concept` | `name`, `purpose`, `principle`, `mark`, and any of `code`, `actions`, `rules`, `machine`, `invariants`, `constraints` | Each concept the work touches |
| `code` | `title`, `at`, `lines` | Source outside a concept |
| `machine` | `title`, `states: [{id, label, means, end, refused}]`, `transitions: [{from, to, when, never, missing, mark}]` | A state machine outside a concept |
| `rules` | `title`, `order`, `rows: [{if, then, mark, before}]` | Rules with no code to show |
| `findings` | `items: [{text, fix}]` | Map mode |
| `terms` | `items: [{term, means}]` | Every term the reader may not know |
| `sources` | `items` of `file:line` strings | Where the claims come from |
| `flow` | `steps: [{label, detail, mark}]` | A short linear sequence with no signatures |
| `svg` | `ref`, the id of a `<template>` holding the SVG | A diagram no other block can draw |
| `note` | `text` | A warning the reader must not miss |

`code`, in a concept or as a block, is a listing `{title, at, lines}`, and `lines` is a list of `{code, note, diff}`: one source line, the plain-words note shown beside it, and `diff` set to `add` or `del` for a changed line. Elide unrelated lines with `…`. Inside a concept, `code` is a list of listings, `actions` is a list of `{name, trigger, effects, atomic, mark, before}`, `rules` and `machine` take the shapes above, and `invariants` is a list of `{text, enforced, where, broken, mark}`, where `enforced` is a rung of the ladder in step 3. A state's `id` is the code's name for it. `never` marks a transition that must never happen, `missing` one that is planned but not built. `mark` is `new` or `changed`, and `before` holds the old value. Wrap code in backticks inside any text, and the page renders it as code. The page lays out graphs and state machines with ELK from jsDelivr, and lists their edges as text when it can't load.

## Limits

- Check invariants against data only in a copy that serves no traffic. Never query a live database to check one.
- Revise the same page as the design moves, and say in a line what changed.
