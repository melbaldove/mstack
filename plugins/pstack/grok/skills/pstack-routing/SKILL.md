---
name: pstack-routing
description: On every task, read pstack's melbs-mode skill first and follow its routing instructions when applicable.
---

# Pstack routing for Grok Build

Read the plugin's `skills/melbs-mode/SKILL.md` and follow its routing instructions when applicable. Grok Build exposes plugin skill paths in the session's skills list. Use `read_file` to open the melbs-mode path listed there.
