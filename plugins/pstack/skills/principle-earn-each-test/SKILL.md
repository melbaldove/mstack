---
name: principle-earn-each-test
description: "Apply before you add or keep a test, and before you commit any test an agent wrote. A test earns its place only when it protects a behavior that nothing else protects and you have seen it fail."
user-invocable: false
---

# Earn Each Test

A committed test is a cost that every later session pays. Agents read it, run it, and keep it passing, and it makes the code under it harder to change. Agent-written tests rarely repay that cost: most check little, and writing more of them does not help agents fix more bugs. Commit a test only when it buys protection that nothing else gives.

This principle decides whether a test should exist. **principle-test-behavior-not-implementation** decides what a test that exists asserts. A repository's own testing rules take precedence over both.

## The gate

Answer all four questions before you commit a new or changed test. If you cannot answer one, do not commit the test.

1. Which behavior that a caller can observe does it protect?
2. Which plausible regression would make it fail?
3. Why does no existing test already catch that regression? Each contract needs one test, at the strongest boundary that is practical.
4. Does it need an export, flag, or wrapper that no production code uses? If it does, test through the real boundary instead.

Then prove the test. Undo the fix or reintroduce the bug, and confirm that the test fails for the reason you intend. Restore the fix and confirm that it passes. A test that you have not seen fail proves nothing.

## How many

- A bug fix gets one regression test, at the boundary where the bug was visible. Do not add one for each layer the bug crossed, each tie-break, or each edge case you thought of along the way.
- A new feature gets a test for each contract that a caller depends on, not for each branch.
- No test is a valid answer. When the only practical test would mostly exercise mocks or need broad new harness setup, verify on the real artifact instead and say so.

## Probes are not tests

Agents use tests mainly to see values. That is fine while you work. Explore with throwaway scripts, prints, or scratch tests, and delete them before you commit. Commit only what passes the gate.

## In the pull request

For each test you add, give one line on the behavior it protects and say that you saw it fail. If you considered a test and did not write one, say so in one line. To prune tests that already exist, use the **test-audit** skill.
