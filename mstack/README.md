# mstack

mstack is Melbourne Baldove's build of [pstack-claude](https://github.com/michael-denyer/pstack-claude). Each build takes upstream's tree, applies two changes, and keeps upstream's generator and tests passing.

1. `rename.mjs` renames the plugin and marketplace to `mstack`, `poteto-mode` to `melbs-mode`, `poteto-agent` to `melbs-agent`, `poteto-help` to `melbs-help`, and `setup-pstack` to `setup-mstack`. Internal paths, such as `plugins/pstack`, the `pstack-models` sheet, and `PSTACK_*` variables, keep their names.
2. `patches/comms.patch` makes replies follow the user's own Communication rules instead of melbs-mode's reply format.

`UPSTREAM` records the pstack-claude commit of the current build.

## Sync

The `mstack sync` workflow rebuilds from upstream every Monday, runs the generator check and the tests, and pushes the result. When a step fails, it opens an issue.

To sync by hand:

```shell
git remote add upstream https://github.com/michael-denyer/pstack-claude.git
mstack/sync.sh
bun tools/generate.mjs --check && bun test tests/
git commit -m "Sync to pstack-claude $(cut -c1-7 mstack/UPSTREAM)"
```

When `comms.patch` no longer applies, `sync.sh` stops with conflict markers. Resolve them, save the patch, and rerun the sync:

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
