// Copyright (c) 2026 Rafael Arciniegas

import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "skills", "proofread", "scripts", "proofread.mjs");

function run(...args) {
  return spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });
}

async function files(original, draft) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "proofread-test-"));
  const originalPath = path.join(dir, "original.md");
  const draftPath = path.join(dir, "draft.md");
  await writeFile(originalPath, original);
  await writeFile(draftPath, draft);
  return [originalPath, draftPath];
}

test("guard permits prose edits when protected spans are unchanged", async () => {
  const [original, draft] = await files(
    "This are text with `npm test`, 42 items, \"exact words\", and https://example.com.\n",
    "This is text with `npm test`, 42 items, \"exact words\", and https://example.com.\n",
  );
  const result = run("guard", original, draft);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).ok, true);
});

test("guard reports changed protected values", async () => {
  const [original, draft] = await files("Version 42 uses `run`.\n", "Version 43 uses `start`.\n");
  const result = run("guard", original, draft);
  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.ok(report.removed.some((item) => item.value === "42"));
  assert.ok(report.removed.some((item) => item.value === "`run`"));
});

test("guard preserves fenced code as an exact block", async () => {
  const source = "Before.\n```js\nconst value = 1;\n```\nAfter.\n";
  const changed = "Before.\n```js\nconst value = 2;\n```\nAfter.\n";
  const [original, same] = await files(source, source);
  assert.equal(run("guard", original, same).status, 0);
  await writeFile(same, changed);
  assert.equal(run("guard", original, same).status, 2);
});

test("scan reports suspicious invisible Unicode without modifying text", async () => {
  const [file] = await files("alpha\u200bbeta\n", "unused\n");
  const result = run("scan", file);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.hits[0].name, "zero-width-space");
});

test("lint rejects a missing path before invoking Harper", () => {
  const result = run("lint", "/definitely/not/a/proofread-file.md");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not a readable file/);
});

test("lint rejects directories before invoking Harper", () => {
  const result = run("lint", root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not a readable file/);
});

test("diff distinguishes changed files without treating differences as an error", async () => {
  const [original, draft] = await files("This are text.\n", "This is text.\n");
  const result = run("diff", original, draft);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /\[-are-\].*\{\+is\+\}/s);
});
