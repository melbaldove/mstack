import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const pathRules = [
  [/poteto-mode/g, "melbs-mode"],
  [/poteto-agent/g, "melbs-agent"],
  [/poteto-help/g, "melbs-help"],
  [/setup-pstack/g, "setup-mstack"],
];

const textRules = [
  ...pathRules,
  [/Poteto mode/g, "Melbs mode"],
  [/pstack@pstack-claude/g, "mstack@mstack"],
  [/(?<![\w.-])pstack:(?=\S)/g, "mstack:"],
  [/"name": "pstack(-claude)?"/g, '"name": "mstack"'],
  [/([!=]== |(?:expectedN|n)ame: )"pstack"/g, '$1"mstack"'],
  [/"pstack\/server"/g, '"mstack/server"'],
  [/manifest name "pstack"/g, 'manifest name "mstack"'],
  [/"displayName": "pstack/g, '"displayName": "mstack'],
  [/You have pstack\./g, "You have mstack."],
];

const repoRule = [/michael-denyer\/pstack-claude/g, "melbaldove/mstack"];
const recordsUpstreamHistory = (file) => /(^|\/)(NOTICE[^/]*|CHANGES)\.md$/.test(file);
const forkOwned = (file) => file.startsWith("mstack/") || file === ".github/workflows/mstack-sync.yml";

const apply = (rules, text) => rules.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), text);
const isBinary = (buffer) => buffer.subarray(0, 8000).includes(0);

const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter((file) => file && !forkOwned(file));

const vacated = new Set();

for (const file of files) {
  const buffer = readFileSync(file);
  const target = apply(pathRules, file);
  if (target !== file) {
    mkdirSync(dirname(target), { recursive: true });
    renameSync(file, target);
    vacated.add(dirname(file));
  }
  if (isBinary(buffer)) continue;
  const text = buffer.toString("utf8");
  const rules = recordsUpstreamHistory(file) ? textRules : [...textRules, repoRule];
  const renamed = apply(rules, text);
  if (renamed !== text) writeFileSync(target, renamed);
}

const removeEmpty = (dir) => {
  if (dir === "." || !existsSync(dir) || readdirSync(dir).length > 0) return;
  rmdirSync(dir);
  removeEmpty(dirname(dir));
};

for (const dir of [...vacated].sort((a, b) => b.length - a.length)) removeEmpty(dir);
