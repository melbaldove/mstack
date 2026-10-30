---
name: test-audit
description: "Use for /test-audit, or when asked to prune, slim, or audit an existing test suite, or to find tests that cost more than they protect. Reads before it deletes, and reports each cut with the evidence that the behavior is still covered."
---

# Test Audit

Prune tests that cost more than they protect. Each test that stays must guard a behavior that nothing else guards. New tests follow **principle-earn-each-test**; this skill applies the same bar to tests that already exist.

A repository's own testing rules take precedence over this skill.

## Why

- Agent-written tests mostly do not check anything. In a 2026 study of about 86,000 test patches from agent-authored pull requests, about 80% had weak or no checks of expected behavior ([Banik et al., arXiv 2606.18168](https://arxiv.org/abs/2606.18168)).
- Writing more tests did not help agents fix more bugs. On SWE-bench Verified, solved and unsolved tasks had similar test-writing rates, and prompting agents to write more or fewer tests did not change the results significantly ([Chen et al., arXiv 2602.07900](https://arxiv.org/abs/2602.07900)).
- Extra tests lock in code. In October 2026, Sherwood Callaway deleted 800,000 lines of unit tests from the Sazabi monorepo, because they made weak code hard to change or remove, made the agent do more local work, and cost tokens and CI runs ([post](https://x.com/shcallaway/status/2106142042405453879)). In September 2026, OpenClaw removed about 400,000 lines of tests without much change in coverage ([its test-audit skill](https://github.com/openclaw/openclaw/blob/main/.agents/skills/test-audit/SKILL.md)).
- Tests can also lock in bugs. Engineers report that agent-written tests asserted defective behavior as correct ([Hacker News](https://news.ycombinator.com/item?id=50059523)).
- Deleting a test moves its risk to the tests that remain. Keep the protection by testing at the boundary that callers use.

## Cut

- Tests with no assertion, assertions that compare a value with itself, and expected values that the code under test computed.
- Tests of standard library behavior or of trivial helpers, such as a slice, a wrapper, or a constant.
- Tests that pin an arbitrary choice that no caller depends on, such as which of two equal results wins.
- Tests that repeat a contract that another test already owns, or that replay a shared helper's test in each caller.
- Tests that assert internal call order, private helpers, copied lists, or text found in the source.
- Mocks that supply the behavior that the test then asserts.
- Test names that promise more than the test exercises.

## Keep

- Contracts that other code or people depend on: public APIs, protocols, configuration, migrations, storage, security, defaults, and observable ordering.
- The regression test for a real bug, at the boundary where the bug was visible.
- A slow or static test that guards one of these contracts. Being slow is not a reason to delete a test.
- A test that fails on the current code. It may have found a bug. Investigate it before you change it.

## Workflow

1. Scope the audit to what the user names, else the test files in the branch diff. Run the area's tests once to record the baseline.
2. For each candidate, record what it would detect, the remaining test that covers the same behavior, why it was added (`git log -S` or blame), and the command that proves the area still works. Do not delete a test when you lack this evidence.
3. Report the candidates before you edit. Prefer a few deletions that you are confident about to a large deletion count.
4. Delete the approved tests, and delete production code that only those tests used.
5. Rerun the area's tests. Check that coverage did not drop by a material amount. Coverage shows only that lines still run, so for critical code also run mutation testing, or break the behavior by hand and confirm that a remaining test fails.

## Output

- What you removed, by category from **Cut**.
- What you kept that looked like a candidate, and why.
- Lines of test code removed, and the new ratio of test code to production code.
- The command that proved each area still works, and its result.
