# mstack

mstack is Melbourne Baldove's build of [pstack-claude](https://github.com/michael-denyer/pstack-claude). Each build takes upstream's tree, applies two changes, and keeps upstream's generator and tests passing.

1. `rename.mjs` renames the plugin and marketplace to `mstack`, `poteto-mode` to `melbs-mode`, `poteto-agent` to `melbs-agent`, `poteto-help` to `melbs-help`, and `setup-pstack` to `setup-mstack`. Internal paths, such as `plugins/pstack`, the `pstack-models` sheet, and `PSTACK_*` variables, keep their names.
2. `patches/mstack.patch` carries every content change:
   - Replies follow the user's Communication rules, and code follows the user's Code rules, including no code comments.
   - The `shape`, `breadboard`, and `build` skills add a Shape Up workflow: shape a raw idea into a pitch with a fixed appetite, then build it within that time.
   - Under a pitch's appetite, the Autonomous run playbook stops when time runs out, `figure-it-out` compares its estimate to the appetite, and `principle-foundational-thinking` sets up only what the first working slice needs.

`UPSTREAM` records the pstack-claude commit of the current build. `stamp-version.mjs` appends three digits from a hash of the rename script and patches to upstream's patch number, so 0.9.102 becomes a version such as 0.9.102831. Claude Code and Codex install a plugin update only when its version string changes, so every change to the fork reaches installed copies.

`save-patch.sh` reruns the sync at the same upstream commit, which restamps the version and proves the patch rebuilds the tree.

## Sync

The `mstack sync` workflow rebuilds from upstream every Monday, runs the generator check and the tests, and pushes the result to the `mstack-sync` branch. It opens a pull request for review, because the plugin's startup hooks run shell commands in every session. If Actions can't open pull requests in this repository, it opens an issue with a compare link instead. When a step fails, it opens an issue.

To sync by hand:

```shell
git remote add upstream https://github.com/michael-denyer/pstack-claude.git
mstack/sync.sh
bun tools/generate.mjs --check && bun test tests/
git commit -m "Sync to pstack-claude $(cut -c1-7 mstack/UPSTREAM)"
```

When `mstack.patch` no longer applies, `sync.sh` stops with conflict markers. Resolve them, save the patch, and rerun the sync:

```shell
mstack/save-patch.sh
mstack/sync.sh
```

To change the patch, edit the files after a sync, then run `mstack/save-patch.sh`.

## Install

```shell
claude plugin marketplace add melbaldove/mstack
claude plugin install mstack@mstack
codex plugin marketplace add melbaldove/mstack
codex plugin add mstack@mstack
```
