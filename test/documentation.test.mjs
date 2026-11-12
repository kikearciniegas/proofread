// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Rafael Arciniegas

import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relative) => JSON.parse(readFileSync(path.join(root, relative), "utf8"));

// Every manifest names the author package.json declares, so authorship is checked
// without writing the name as a literal anywhere but package.json.
const AUTHOR_FIELDS = [
  [".claude-plugin/plugin.json", ["author", "name"]],
  [".claude-plugin/marketplace.json", ["plugins", 0, "author", "name"]],
  [".codex-plugin/plugin.json", ["author", "name"]],
  [".codex-plugin/plugin.json", ["interface", "developerName"]],
  ["plugin.json", ["author", "name"]],
  ["plugin.json", ["extensions", "com.openai", "interface", "developerName"]],
];
function authorMismatches(read) {
  const author = read("package.json").author;
  return AUTHOR_FIELDS.filter(([file, keys]) => keys.reduce((node, key) => node?.[key], read(file)) !== author)
    .map(([file, keys]) => `${file} ${keys.join(".")}`);
}

function markdownFiles(dir) {
  const result = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...markdownFiles(target));
    else if (entry.name.endsWith(".md")) result.push(target);
  }
  return result;
}

test("all local documentation links resolve", () => {
  const files = [
    "README.md", "NOTICE.md", "PRIVACY.md", "SECURITY.md", "THIRD_PARTY_NOTICES.md",
  ].map((file) => path.join(root, file));
  files.push(
    ...markdownFiles(path.join(root, "docs")),
    ...markdownFiles(path.join(root, "adapters")),
    ...markdownFiles(path.join(root, "skills", "proofread")),
  );
  const failures = [];
  const links = /!?(?:\[[^\]]*\])\(([^)]+)\)/g;
  for (const file of files) {
    const body = readFileSync(file, "utf8");
    for (const match of body.matchAll(links)) {
      const raw = match[1].trim().replace(/^<|>$/g, "");
      if (!raw || raw.startsWith("#") || /^(?:https?:|mailto:)/i.test(raw)) continue;
      const target = path.resolve(path.dirname(file), decodeURIComponent(raw.split("#", 1)[0]));
      if (!existsSync(target)) failures.push(`${path.relative(root, file)} -> ${raw}`);
    }
  }
  assert.deepEqual(failures, []);
});

test("proofread CLI help names every command", () => {
  const script = path.join(root, "skills", "proofread", "scripts", "proofread.mjs");
  const result = spawnSync(process.execPath, [script, "--help"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  for (const command of ["doctor", "lint", "scan", "guard", "diff"]) assert.match(result.stdout, new RegExp(`\\b${command}\\b`));
});

test("authorship and license metadata remain attached", () => {
  const notice = "Copyright (c) 2026 Rafael Arciniegas";
  const packageData = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
  assert.ok(packageData.author?.trim());
  assert.deepEqual(authorMismatches(readJson), []);
  assert.equal(packageData.license, "MIT");
  assert.ok(readFileSync(path.join(root, "NOTICE.md"), "utf8").includes(notice));
  assert.ok(readFileSync(path.join(root, "skills", "proofread", "NOTICE.md"), "utf8").includes(notice));
  assert.match(readFileSync(path.join(root, "LICENSE"), "utf8"), /^MIT License/);
  assert.match(readFileSync(path.join(root, "skills", "proofread", "LICENSE"), "utf8"), /^MIT License/);
});

test("the shared Gemini Gem URL remains documented", () => {
  const url = "https://gemini.google.com/gem/1xQ_c5-mPSw4NMm5TiTQbH-rdZ5uMNCJC?usp=sharing";
  for (const relative of ["README.md", "docs/desktop-apps.md", "docs/gemini-gem.md"]) {
    assert.ok(readFileSync(path.join(root, relative), "utf8").includes(url), `${relative} is missing the shared Gem URL`);
  }
});

test("control: a manifest whose author differs from package.json is caught", () => {
  for (const [file, keys] of AUTHOR_FIELDS) {
    const altered = (relative) => {
      const data = readJson(relative);
      if (relative !== file) return data;
      keys.slice(0, -1).reduce((node, key) => node[key], data)[keys.at(-1)] = "Someone Else";
      return data;
    };
    assert.deepEqual(authorMismatches(altered), [`${file} ${keys.join(".")}`]);
  }
});

test("control: the Claude validator refuses a differing author and a mismatched marketplace owner", () => {
  const cases = [
    [".claude-plugin/plugin.json", (m) => { m.author.name = "Someone Else"; }, /Claude manifest author must equal package.json author/],
    [".claude-plugin/marketplace.json", (m) => { m.owner.name = "someone-else"; }, /marketplace owner must be the GitHub account its url names/],
  ];
  for (const [file, change, reason] of cases) {
    const dir = mkdtempSync(path.join(tmpdir(), "validate-claude-"));
    try {
      for (const relative of ["package.json", ".claude-plugin", "scripts/validate-claude-plugin.mjs", "skills/proofread/SKILL.md"]) {
        cpSync(path.join(root, relative), path.join(dir, relative), { recursive: true });
      }
      const ok = spawnSync(process.execPath, [path.join(dir, "scripts/validate-claude-plugin.mjs")], { encoding: "utf8" });
      assert.equal(ok.status, 0, ok.stderr);
      const data = JSON.parse(readFileSync(path.join(dir, file), "utf8"));
      change(data);
      writeFileSync(path.join(dir, file), JSON.stringify(data));
      const bad = spawnSync(process.execPath, [path.join(dir, "scripts/validate-claude-plugin.mjs")], { encoding: "utf8" });
      assert.notEqual(bad.status, 0);
      assert.match(bad.stderr, reason);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
});
