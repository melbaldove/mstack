---
name: architect
description: "Sketch types, signatures, and module structure before code, then stay in the loop while implementation fills in. Use for /architect, 'architect this', 'design this', or non-trivial work where jumping to code would lock in the wrong shape."
---

# Architect

On Codex, read the [platform mapping](../melbs-mode/references/codex-tools.md), including its per-skill notes, before following this skill.

On GitHub Copilot, read the [platform mapping](../melbs-mode/references/copilot-tools.md), including its per-skill notes, before following this skill.

On Muse, read the [platform mapping](../melbs-mode/references/muse-tools.md), including its per-skill notes, before following this skill.

On Antigravity, read the [platform mapping](../melbs-mode/references/agy-tools.md), including its per-skill notes, before following this skill.

Before writing code, trace every system the change touches, then sketch two different shapes for it (types, signatures, module boundaries) and pick the one where each piece of state has one owner, each task has one way to do it, and callers need to know least. Redesign instead of patching if workarounds repeat.

For a large or contested design, run the **arena** skill instead of sketching alone.

Show the chosen design to the user as a **skeleton** page in design mode. Stop at each decision the page leaves open and wait for the user's answer. When the intent settles every decision, show the page and proceed. Under an autonomous run the user stepped away from, record your picks on the page and proceed.

Before closing each implementation unit or handing its contract to the next worker, compare accepted deviations with the saved sketch and rationale. Once the owner or review process accepts a change, update the affected parts of the sketch and record who accepted it. Keep unaccepted changes and unresolved disagreements visible, and never edit the sketch merely to justify what was implemented.
