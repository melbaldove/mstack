import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const upstream = process.argv[2];
if (!upstream) throw new Error("usage: bun mstack/stamp-version.mjs <upstream-sha>");

const forkInputs = ["mstack/rename.mjs", ...readdirSync("mstack/patches").sort().map((file) => `mstack/patches/${file}`)];
const digest = createHash("sha256");
for (const file of forkInputs) digest.update(readFileSync(file));

const [major, minor, patch] = readFileSync("VERSION", "utf8").trim().split(".");
const build = String(parseInt(digest.digest("hex").slice(0, 8), 16) % 1000).padStart(3, "0");
const version = `${major}.${minor}.${patch}${build}`;
writeFileSync("VERSION", `${version}\n`);

const changes = readFileSync("CHANGES.md", "utf8");
const firstEntry = changes.indexOf("\n## ");
const entry = `\n## ${version} - mstack build of pstack-claude ${upstream.slice(0, 7)}\n\nThis build renames pstack to mstack and applies the fork's patch. mstack/README.md lists what the patch changes.\n`;
writeFileSync("CHANGES.md", changes.slice(0, firstEntry) + entry + changes.slice(firstEntry));
console.log(version);
