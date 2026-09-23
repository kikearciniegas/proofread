// Copyright (c) 2026 Rafael Arciniegas

import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildInstallPlan, installPlan, parseAgentSelection, SUPPORTED_AGENTS } from "../scripts/lib/agent-compat.mjs";

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "proofread-agent-compat-"));
  const skill = path.join(root, "skills", "proofread");
  await mkdir(skill, { recursive: true });
  await writeFile(path.join(skill, "SKILL.md"), "---\nname: proofread\ndescription: test\n---\n");
  return root;
}

test("supported agents collapse to three discovery paths", async () => {
  const root = await fixture();
  const plan = buildInstallPlan({ projectRoot: root, homeDir: path.join(root, "home"), scope: "project", agents: parseAgentSelection("all") });
  assert.equal(plan.length, 3);
  assert.deepEqual(new Set(plan.map((item) => item.group)), new Set(["universal", "codex", "claude"]));
  assert.deepEqual(parseAgentSelection("all"), [...SUPPORTED_AGENTS]);
});

test("project links are relative and installation is idempotent", async () => {
  const root = await fixture();
  const plan = buildInstallPlan({ projectRoot: root, scope: "project", agents: parseAgentSelection("all") });
  const first = await installPlan(plan);
  assert.ok(first.every((item) => item.status === "installed"));
  for (const item of first) assert.equal(path.isAbsolute(await readlink(item.target)), false);
  const second = await installPlan(plan);
  assert.ok(second.every((item) => item.status === "installed" && !item.action));
});

test("copy mode creates independent skills", async () => {
  const root = await fixture();
  const plan = buildInstallPlan({ projectRoot: root, homeDir: path.join(root, "home"), scope: "user", agents: parseAgentSelection("codex,gemini") });
  const result = await installPlan(plan, { copy: true });
  assert.equal(result.length, 2);
  for (const item of result) assert.match(await readFile(path.join(item.target, "SKILL.md"), "utf8"), /proofread/);
});

test("unknown agents and conflicts fail safely", async () => {
  assert.throws(() => parseAgentSelection("hal-9000"), /Unsupported agent/);
  const root = await fixture();
  const plan = buildInstallPlan({ projectRoot: root, scope: "project", agents: ["codex"] });
  await mkdir(plan[0].target, { recursive: true });
  await assert.rejects(() => installPlan(plan), /Refusing to overwrite/);
});
