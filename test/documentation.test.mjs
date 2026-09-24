// Copyright (c) 2026 Rafael Arciniegas

import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
  assert.equal(packageData.author, "Rafael Arciniegas");
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
