// Copyright (c) 2026 Rafael Arciniegas

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8", ...options });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

function archiveEntries(archive) {
  return run("unzip", ["-Z1", archive]).trim().split("\n").filter(Boolean);
}

test("desktop distributions contain the expected portable layouts", () => {
  const out = mkdtempSync(path.join(os.tmpdir(), "proofread-distributions-"));
  try {
    run(process.execPath, ["scripts/build-distributions.mjs", "--out", out]);

    const packageData = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
    const manifest = JSON.parse(readFileSync(path.join(out, "manifest.json"), "utf8"));
    assert.equal(manifest.version, packageData.version);
    assert.deepEqual(manifest.files.map(({ target }) => target), ["claude", "chatgpt", "gemini"]);

    for (const entry of manifest.files) {
      const body = readFileSync(path.join(out, entry.file));
      assert.equal(createHash("sha256").update(body).digest("hex"), entry.sha256);
    }

    const claudeEntries = archiveEntries(path.join(out, "proofread-claude-desktop.zip"));
    assert.ok(claudeEntries.includes("proofread/SKILL.md"));
    assert.ok(claudeEntries.includes("proofread/agents/openai.yaml"));
    assert.ok(claudeEntries.includes("proofread/references/interoperability.md"));
    assert.ok(claudeEntries.every((entry) => entry.startsWith("proofread/")));

    const pluginEntries = archiveEntries(path.join(out, "proofread-chatgpt-plugin.zip"));
    for (const expected of [
      "plugin.json",
      ".codex-plugin/plugin.json",
      "skills/proofread/SKILL.md",
      "skills/proofread/agents/openai.yaml",
      "skills/proofread/references/interoperability.md",
      "assets/proofread-logo.svg",
    ]) assert.ok(pluginEntries.includes(expected), `plugin archive is missing ${expected}`);

    const gemini = readFileSync(path.join(out, "proofread-gemini-instructions.md"), "utf8");
    assert.match(gemini, /cannot run this project's local Harper/i);
    assert.match(gemini, /Never claim those automated checks ran/i);
    assert.match(gemini, /## Translated text/);
    assert.match(gemini, /accuracy and\s+completeness were not verified/i);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});
