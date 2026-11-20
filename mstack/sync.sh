#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
git fetch --quiet upstream
sha=$(git rev-parse "${1:-upstream/main}")
base=$(cat mstack/UPSTREAM)

keep=$(mktemp -d)
cp -R mstack "$keep/mstack"
cp .github/workflows/mstack-sync.yml "$keep/mstack-sync.yml"

rebuild() {
  git rm -rqf --ignore-unmatch .
  git checkout "$1" -- .
  local workflow_tests
  workflow_tests=$(git grep -l -e '\.github/workflows' -- tests || true)
  git rm -rqf --ignore-unmatch .github/workflows $workflow_tests

  mkdir -p .github/workflows
  cp -R "$keep/mstack" .
  cp "$keep/mstack-sync.yml" .github/workflows/mstack-sync.yml
  git add mstack .github/workflows/mstack-sync.yml

  bun mstack/rename.mjs
  bun mstack/stamp-version.mjs "$1"
  bun install --frozen-lockfile --ignore-scripts
  [ -f plugins/package.json ] && (cd plugins && bun install --frozen-lockfile --ignore-scripts)
  bun tools/generate.mjs
  git add -A
}

if [ "$base" != "$sha" ]; then
  rebuild "$base"
fi
rebuild "$sha"
git write-tree > "$(git rev-parse --git-dir)/mstack-renamed-tree"

echo "$sha" > mstack/UPSTREAM
for patch in mstack/patches/*.patch; do
  git apply --3way "$patch"
done
bun tools/generate.mjs
git add -A
