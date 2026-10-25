---
name: build
description: "Use when the user runs /build, or bets on a shaped pitch and wants agents to build it. Builds the pitch within its appetite: one owner, one working piece first, scopes mapped as they emerge, and a hard stop when time runs out."
---

# Build

Build a shaped pitch within its appetite. Text after `/build` names the pitch file. If there is none, use the pitch in the conversation, or ask for it. The method is the building half of Ryan Singer's Shape Up, run through the playbooks of the **melbs-mode** skill.

The pitch is the contract. Its problem, appetite, solution, rabbit holes, and no-gos bind the build. The appetite is fixed and the scope is not.

## Steps

1. **Own the whole pitch.** One owner builds and integrates it, through melbs-mode's Feature playbook, or its Autonomous run playbook when the user steps away. Subagents can take parts, and the owner merges every part into one working whole. Ask the user only at the review points the appetite budgets.
2. **Start the clock.** Record the start time in the pitch file. Every decision below compares the time spent with the appetite.
3. **Kick off before code.** Write the demo first: one thing a user does through the real entry point that shows the pitch's problem story ending better. List the tasks you can see, group them into scopes, which are parts that can be finished on their own, and mark the scopes that hold unknowns. Name a scope after you see what's in it. New tasks appear as you build. Put each one in its scope, or mark it a nice-to-have with `~`.
4. **Get one piece done first.** Pick a small, central scope with the biggest unknown and make it work end to end through the real entry point. Build only what that piece needs, then grow from it.
5. **Show progress without being asked.** Keep a short status in the pitch file. Each scope is uphill, still being figured out, or downhill, with only execution left. Work uphill scopes first.
6. **Decide when to stop.** Compare to the baseline in the pitch, not to an ideal. Cut nice-to-haves to fit the time. A review finding blocks only when it's a correctness problem or a missing requirement. Treat the rest as nice-to-haves. Arena and interrogate rounds and fixes outside the pitch spend the appetite like any other work.
7. **Stop when the time runs out.** Report what works, what's still uphill, and what was cut. The unfinished part goes back to the **shape** skill. Don't extend by default. Extend only when the user agrees and everything left is downhill and a must-have.

Done means merged, running where its users get it, and the demo passing through the real entry point. A deploy still needs the user's go-ahead. For a spike pitch, done means the open question is answered, and nothing is expected to ship.
