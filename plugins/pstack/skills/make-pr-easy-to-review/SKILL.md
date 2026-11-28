---
name: make-pr-easy-to-review
description: Prepare PRs for review by cleaning noisy history, improving PR descriptions, and adding reviewer guidance without changing code behavior. Use for "make this easy to review", "tidy this PR", "clean up commits", or "annotate the diff".
---

# Make PR Easy to Review

Prepare a PR so a reviewer can quickly understand the intent, important files, and risk. The default goal is reviewability without behavior changes.

## Workflow

1. Resolve the target PR from the user-provided URL or current branch.
2. Inspect commits, diff size, changed paths, generated files, and PR description.
3. Identify reviewability issues: noisy commits, stale description, unrelated changes, mixed mechanical and logic changes, missing tests, or unclear reviewer entry points.
4. Propose a plan before rewriting history or force-pushing.
5. Apply safe improvements, then verify the tree or diff still matches the intended code.

## History Cleanup

Only rewrite history when the user asks for it or agrees to the plan. Before rewriting:

```bash
gh pr view <PR> --json title,headRefName,baseRefName,state,commits
git fetch origin <headRefName> <baseRefName>
ORIGINAL_TREE=$(git rev-parse origin/<headRefName>^{tree})
```

Good commit groupings usually follow dependency order:

1. Schema/storage or generated API definitions.
2. Core logic.
3. Wiring and integration.
4. UI or surface behavior.
5. Tests.

After rewriting, verify content identity:

```bash
echo "Original tree: $ORIGINAL_TREE"
echo "Current tree:  $(git rev-parse HEAD^{tree})"
git diff origin/<headRefName> --stat
```

Do not push if the tree changed unintentionally.

## Reviewer Guidance

When code behavior should stay untouched, prefer PR description and review notes:

- **Summary with the smallest clear visual:** lead with a TL;DR that matches the diff and pick the smallest structure that makes the change obvious—short pseudocode, a call/component/file tree, a Mermaid sequence diagram (GitHub renders Mermaid), or a structural `diff` block (`-`/`+` on file layout, component tree, or control flow).
- **Separate core from mechanical files:** point reviewers at the real entry points before generated or boilerplate diffs.
- **Before/After evidence:** attach screenshots or recordings for visual changes, and real trimmed failing-before / passing-after command output for behavioral changes (never pseudocode tests). Add a one-line note per committed test naming the behavior it protects (or why none was added).
- **Merge danger:** classify the PR as a **two-way door** (cheap to revert) or **one-way door** (schema migrations, persisted formats, external contracts) and state the blast radius, migration order, and rollout plan.
- **Link context:** reference issue trackers, dashboards, or design docs when they explain intent.
- **Scale to size:** for small, low-risk fixes, collapse this to a two-sentence summary and verification line instead of full ceremony.

## Guardrails

- Never hide meaningful behavior changes inside "cleanup".
- Do not bypass hooks unless the user explicitly asks.
- If the PR is too large to make reviewable with notes, recommend splitting instead of polishing around the problem.
