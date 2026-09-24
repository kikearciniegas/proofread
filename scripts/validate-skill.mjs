// Copyright (c) 2026 Rafael Arciniegas

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillRoot = path.join(root, "skills", "proofread");
const skillPath = path.join(skillRoot, "SKILL.md");
assert.ok(existsSync(skillPath), "SKILL.md is missing");
const body = readFileSync(skillPath, "utf8");
assert.ok(body.startsWith("---\n"), "SKILL.md must start with YAML frontmatter");
const closing = body.indexOf("\n---\n", 4);
assert.ok(closing > 4, "SKILL.md frontmatter is not closed");
const frontmatter = body.slice(4, closing);
assert.match(frontmatter, /^name:\s*proofread\s*$/m, "invalid skill name");
assert.match(frontmatter, /^description:\s*\S.{40,}$/m, "description must explain the skill and when to use it");
assert.match(frontmatter, /^license:\s*MIT\b/m, "skill must declare the MIT license");
const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim();
assert.ok(description && description.length <= 200, "description must be at most 200 characters for Claude Desktop");
assert.doesNotMatch(frontmatter, /^metadata:\s*$/m, "OpenAI interface settings belong in agents/openai.yaml, not SKILL.md metadata");
for (const relative of ["LICENSE", "NOTICE.md", "THIRD_PARTY_NOTICES.md", "agents/openai.yaml", "scripts/proofread.mjs"]) {
  assert.ok(existsSync(path.join(skillRoot, relative)), `${relative} is missing`);
}
const openai = readFileSync(path.join(skillRoot, "agents", "openai.yaml"), "utf8");
assert.match(openai, /^interface:\s*$/m, "agents/openai.yaml must define interface");
for (const field of ["display_name", "short_description", "default_prompt"]) {
  assert.match(openai, new RegExp(`^  ${field}:\\s*\\S`, "m"), `agents/openai.yaml is missing interface.${field}`);
}
console.log("Skill validation passed: proofread");
