---
name: skeleton
description: Use when designing a change that crosses a function or module boundary, building something new, or when the user asks how part of a system works or wants to understand or simplify it. Lays out the intent, then the types, state machines, invariants, constraints, and boundaries on one page the user reads instead of the code.
---

# Skeleton

The user keeps their own model of each system while agents write the bodies. The skeleton is that model: the design, laid out so the user can reason about it and decide it without reading code.

## Signal over noise

This rule outranks every other in this skill. Show the decided design and only what is still open. Each element on the page must help the user understand the design or make a decision; cut anything else. Use the user's terms: types, state machines, invariants, constraints. Never add labels of your own, and never add a toggle between options that are already decided.

## Modes

- **Design.** For a change or a new build. Show the design you recommend. In existing code, mark each type, transition, and invariant the change adds or changes.
- **Map.** For "how does X work", or a request to understand or simplify part of a system. Show the system as the code has it today, with findings.

## Steps

1. **Intent first.** It tops the page: the goal in one sentence, what done means, what must never happen, and what is out of scope. Take it from the pitch when the **shape** skill wrote one. Otherwise draft it and have the user confirm it before you design against it. In map mode, state what the part is for, as the code shows it.
2. **Read the code the change touches.** Run the **how** skill on systems you don't know. Take signatures and call sites from the code itself, such as a declaration build or the source, never from memory.
3. **Model it as concepts.** For each concept: its purpose in one line, its types (with their constraints), its state machine (each transition with what causes it, and transitions that must never happen), its invariants, and its constraints. Tag each invariant with how it is enforced, strongest first: law (proved, such as Bend 2's `LAWS.bend`), type, database, test, model check, repair job, nothing enforces it. Mark any invariant the code breaks today.
4. **Decide what the intent settles.** Check each candidate design against the intent. Drop one that breaks a "never" or misses "done means", and give the reason in one line. Ask the user only what the intent leaves open, such as a trade-off between two goals it names. For each open question, give a pick, its reason, and a comparison on measures that let the user decide correctly.
5. **In map mode, add findings** where the model is more complex than the domain: a concept with several purposes, state that copies other state, an invariant nothing enforces, one piece of state with several writers, a state nothing reaches. Give each finding the simplest fix and its cost.
6. **Draw the boundaries:** who acts, what they call, the outside systems, and the stores. Each box gets a brief: its signature, what it does, how this design changes it, any warning, and its connections. Cite a `file:line` for each claim about existing code, and read that line before you cite it.
7. **Build the page** from [`references/page.html`](references/page.html). Copy it to a scratch folder and replace only the JSON in its `skeleton-data` block. Show the page where the user is working, beside the conversation if the host can render HTML, and give the file's path.

## Limits

- Check invariants against data only in a copy that serves no traffic. Never query a live database to check one.
- Skip the page for a change inside one function, where a sentence says it.
- Revise the same page as the design moves, and say in a line what changed.
