---
name: principle-review-for-real-risk
description: "Apply when you review a diff, and when you act on review findings from a person, a bot, or a subagent. Report and fix only what the change breaks, with proof, and stop the review-and-fix loop when it stops finding real risk."
user-invocable: false
---

# Review for Real Risk

A review is worth what its findings would cost if they shipped. Each finding that is not a real risk costs the author a fix, a test, and another round of review, and that work hides the findings that matter. A reviewer that reports everything it can think of trains its readers to ignore it.

## What earns a finding

A finding names a failure that the change introduces or exposes: a caller, user, or operator gets a wrong result, loses data, gains access they should not have, or can no longer build or run the code. It names the input or state that triggers the failure and the wrong outcome.

Leave out:

- Style, naming, and structure, unless the user asked for a quality review.
- Risks that need a future change to matter, and defensive checks for states the code cannot reach.
- Problems in code that the change does not touch or newly depend on.
- Duplicates. Merge findings that share a root cause.

## Prove it

Trace each finding end to end, or run it: a failing test, a repro script, or command output that shows the wrong behavior. Do not report a finding that depends on code you can read but did not. When you cannot prove a finding and it would be severe, report it once as unproven and say what would settle it.

Rank the findings by what they would cost in production and lead with the worst. State each one's severity honestly. A long list usually means the bar slipped. No findings is a valid result.

## Acting on findings

- Fix a finding that clears the bar. For one that does not, reply with the reason, in one line, and leave the code alone.
- A fix gets at most one regression test, per **principle-earn-each-test**.
- Review each later round against the fix's diff only. A finding that the first round could have raised and did not is not a reason for another round.
- Stop when a round finds no new real risk. After two rounds of fixes, when a blocking finding remains, stop and report it with its evidence, and let the human choose another round, a narrower change, or to drop it.
