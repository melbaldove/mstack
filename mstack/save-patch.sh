#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
renamed=$(cat "$(git rev-parse --git-dir)/mstack-renamed-tree")
git add -A
git diff --cached "$renamed" -- . ':(exclude)mstack' ':(exclude).github/workflows' > mstack/patches/mstack.patch
