import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const upstream = process.argv[2];
if (!upstream) throw new Error("usage: bun mstack/stamp-version.mjs <upstream-sha>");

const forkInputs = ["mstack/rename.mjs", "mstack/patches"];
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const committedChanges = Number(git("rev-list", "--count", "HEAD", "--", ...forkInputs));
const pendingChange = git("status", "--porcelain", "--", ...forkInputs) ? 1 : 0;
const forkBuild = committedChanges + pendingChange;
if (forkBuild > 9999) throw new Error("the fork build number no longer fits in four digits");

const [major, minor, patch] = readFileSync("VERSION", "utf8").trim().split(".");
const version = `${major}.${minor}.${patch}${String(forkBuild).padStart(4, "0")}`;
writeFileSync("VERSION", `${version}\n`);

const changes = readFileSync("CHANGES.md", "utf8");
const firstEntry = changes.indexOf("\n## ");
const entry = `\n## ${version} - mstack build of pstack-claude ${upstream.slice(0, 7)}\n\nThis build renames pstack to mstack and applies the fork's patch. mstack/README.md lists what the patch changes.\n`;
writeFileSync("CHANGES.md", changes.slice(0, firstEntry) + entry + changes.slice(firstEntry));
console.log(version);
