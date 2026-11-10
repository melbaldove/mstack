---
name: skeleton
description: Use when designing a change that crosses a function or module boundary, building something new, explaining a change already made, or when the user asks how part of a system works or wants to understand or simplify it. Puts the answer first, then only the intent, decisions, flows, state machines, invariants, and terms the reader needs, on one page the user reads instead of the code.
---

# Skeleton

The user keeps their own model of each system while agents write the bodies. The skeleton page gives them that model, so they can understand a design or decide it without reading code.

## Signal over noise

This rule outranks every other in this skill. The reader must understand the page cold, in one pass.

- Open with the answer, in two to four plain sentences.
- Add a block only when the reader needs it to understand or decide. Cut any block that restates another or only fills a slot.
- Write in the reader's words. Say what a person sees or does before you name code. Name a code identifier only where the reader needs it to find the code.
- Define each term the reader may not know in a Terms block, and give each thing one name.
- Never add labels or toggles of your own.

## Modes

- **Design.** A change not built yet. Show the design you recommend, and ask only what the intent leaves open.
- **Explain.** A change already made, such as a pull request or a fix. Show what a person saw before, what they see now, and the cause in between.
- **Map.** A request to see how part of a system works, or to understand or simplify it. Show it as the code has it today, with findings.

## Steps

1. **Intent.** In design mode, write the goal in one sentence, what done means, what must never happen, and what is out of scope. Take it from the pitch when the **shape** skill wrote one. Otherwise draft it and have the user confirm it before you design against it. In explain mode, state the symptom the change fixes, as a person saw it. In map mode, state what the part is for, as the code shows it.
2. **Read the code.** Run the **how** skill on systems you don't know. Take signatures and call sites from the code, never from memory. Read each line before you cite it, and drop any claim you could not check.
3. **Model only what the reader needs.** Give each concept the change touches its purpose in one line, then whichever of these apply: types with their constraints; its state machine, with what causes each transition and the transitions that must never happen; its invariants, each tagged with how it is enforced, strongest first (law, such as Bend 2's `LAWS.bend`; type; database; test; model check; repair job; nothing); and its constraints. Mark any invariant the code breaks today. In explain mode, a before-and-after and the changed step on the path usually say it all.
4. **Decide what the intent settles.** In design mode, drop each candidate that breaks a "never" or misses "done means", and give the reason in one line. For each question the intent leaves open, give a pick, its reason, and a comparison on measures that let the user decide correctly.
5. **Add findings in map mode** where the model is more complex than the domain: a concept with several purposes, state that copies other state, an invariant nothing enforces, one piece of state with several writers, or a state nothing reaches. Give each the simplest fix and its cost.
6. **Draw the path** a request takes, top to bottom: who acts, what they call, the outside systems, and the stores. Mark the steps the change adds or changes. Draw a path that branches in D2 and embed the SVG.
7. **Build the page** from [`references/page.html`](references/page.html). Copy it to a scratch folder and replace only the JSON in its `skeleton-data` block, plus any SVG templates. Show the page beside the conversation when the host can render HTML, and give the file's path. Put the answer in your reply as well.

## Blocks

The page is a list of blocks, rendered in the order you give them. The answer comes first.

| Block | Holds | Use it for |
|---|---|---|
| `answer` | `text` | Every page, first |
| `compare` | `columns: [{label, items}]`, optional `pick` (column index) | Before and after, or two options side by side |
| `intent` | `goal`, `done`, `never`, `out` | Design mode |
| `decision` | `question`, `why`, `options`, `pick`, `reason`, `measures: [{label, values}]` | One open question each |
| `flow` | `steps: [{label, detail, mark, src}]` | The path a request takes |
| `states` | `rows: [{from, to, when, never, mark}]` | A state machine on its own |
| `concept` | `name`, `purpose`, and any of `types`, `states`, `invariants: [{text, enforced, broken}]`, `constraints` | Design and map mode |
| `findings` | `items: [{text, fix}]` | Map mode |
| `terms` | `items: [{term, means}]` | Every term the reader may not know |
| `sources` | `items` of `file:line` strings | Where the claims come from |
| `svg` | `ref`, the id of a `<template>` holding the SVG | A diagram that branches |
| `note` | `text` | A warning the reader must not miss |

Every block takes an optional `title`. `mark` is `new` or `changed`. Wrap code in backticks inside any text, and the page renders it as code.

## Limits

- Check invariants against data only in a copy that serves no traffic. Never query a live database to check one.
- A change inside one function needs no page, because a sentence says it. When the user asks for a page anyway, keep it to the answer, the before and after, the path with the changed step, and the terms.
- Revise the same page as the design moves, and say in a line what changed.
