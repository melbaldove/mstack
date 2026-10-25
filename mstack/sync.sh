#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
git fetch --quiet upstream
sha=$(git rev-parse "${1:-upstream/main}")

keep=$(mktemp -d)
cp -R mstack "$keep/mstack"
cp .github/workflows/mstack-sync.yml "$keep/mstack-sync.yml"

git rm -rqf --ignore-unmatch .
git checkout "$sha" -- .

mkdir -p .github/workflows
cp -R "$keep/mstack" .
cp "$keep/mstack-sync.yml" .github/workflows/mstack-sync.yml
git add mstack .github/workflows/mstack-sync.yml

bun mstack/rename.mjs
bun mstack/stamp-version.mjs "$sha"
bun install --frozen-lockfile --ignore-scripts
bun tools/generate.mjs
git add -A
git write-tree > "$(git rev-parse --git-dir)/mstack-renamed-tree"

for patch in mstack/patches/*.patch; do
  git apply --3way "$patch"
done
echo "$sha" > mstack/UPSTREAM
bun tools/generate.mjs
git add -A
