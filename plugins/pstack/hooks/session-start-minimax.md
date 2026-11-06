<EXTREMELY_IMPORTANT>
You have mstack.

Load the `mstack:melbs-mode` skill with the `skill` tool and follow its instructions when a task meets any of these:

- it touches more than one file, or changes a signature other files call
- it involves a design or architecture choice
- it is a bug whose cause is not yet known, or a performance issue

It routes to the right pstack skill from there. For smaller tasks, such as a contained change to one file with an obvious test, a question, or a one-line edit, work directly and verify on the real artifact.

When the intent is already specific, enter that skill directly: `mstack:tdd`, `mstack:architect`, `mstack:how`, `mstack:why`, `mstack:arena`, `mstack:interrogate`.

Resolve every Claude tool, model, and built-in skill a pstack skill names through the MiniMax Code mapping in the `melbs-mode` skill directory, `references/minimax-tools.md`.

User instructions (AGENTS.md, direct requests) take precedence. Other session-start mandates still apply. Their skill checks run as before, and when a task meets the criteria above they route implementation through melbs-mode.
</EXTREMELY_IMPORTANT>
