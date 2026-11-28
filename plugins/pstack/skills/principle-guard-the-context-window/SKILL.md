---
name: principle-guard-the-context-window
description: "Apply when context is filling up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents; keep summaries in the main thread, not raw payloads."
user-invocable: false
---

# Guard the Context Window

**Why:** Context overflow degrades reasoning quality, creates compression artifacts, and halts progress.

**Pattern:**
- **Size phases and cap scope.** Limit files per phase, set turn budgets, account for mechanism costs.
- **Pick the lightest phase-boundary transition.** At a phase boundary, move in order: continue (context is lean and the next step builds on it) → clear (outputs already live in files or commits, so a fresh session reads primary sources directly) → pause/handoff (cross-harness, cross-directory, or mid-phase transfer) → subagent (isolate noisy exploration or independent slices) → compact (last resort; lossy).
- **Never compact mid-phase.** Finish the atomic step or hand off cleanly rather than summarizing a half-built mental model.
- **Prefer primary sources over compressed chat.** Pointing a fresh session at code, commits, or a pitch carries higher fidelity and less noise than a summary.
