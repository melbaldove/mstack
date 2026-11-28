---
name: principle-sequence-verifiable-units
description: "Apply to multi-step work (sweeps, migrations, runs of similar edits) and to how you stack commits and PRs. Break work into small units that each end in a verifiable state, check each before the next, and order delivery so the sequence proves itself to a reviewer."
user-invocable: false
---

# Sequence work into verifiable units

Order work as small units that each end in a state you can check, and do not advance until the current one is green.

In a sweep, migration, or run of similar edits, each unit is a bracket: known-good state, one change, run the check, proceed. Run the per-unit check even when a tool does the edits.

Deliver in the order that proves the work: the failing test first, then the fix. The subtraction before the reshape. The baseline before the treatment. Make the change easy first: land behavior-preserving prefactoring before the behavioral unit that relies on it. Each commit lands on its own.

**Wide-refactor exception (expand–contract):** default to migrating callers and deleting legacy APIs in one wave (the **migrate-callers-then-delete-legacy-apis** principle skill). When a mechanical rename or schema change is too wide for one safe PR or fresh context window, split it into `expand` (add new beside old) → `migrate` batches (each green) → `contract` (delete old once zero callers remain).
