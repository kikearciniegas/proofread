#!/usr/bin/env node
// Copyright (c) 2026 Rafael Arciniegas

import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildInstallPlan, inspectPlan, installPlan, parseAgentSelection, SUPPORTED_AGENTS } from "./lib/agent-compat.mjs";

function usage() {
  return `Usage:
  node scripts/install-agent-skill.mjs install [options]
  node scripts/install-agent-skill.mjs check [options]

Options:
  --scope project|user       Installation scope (default: project)
  --agents all|a,b,c         Agent subset (default: all)
  --copy                     Copy instead of linking
  --dry-run                  Show planned state without writing
  --json                     Emit machine-readable JSON
  --project-root PATH        Override repository root (mainly for tests)
  --home PATH                Override home directory (mainly for tests)
  --help                     Show this help

Agents: ${SUPPORTED_AGENTS.join(", ")}`;
}

function parseArgs(argv) {
  const options = { command: "install", scope: "project", agents: "all", copy: false, dryRun: false, json: false };
  const args = [...argv];
  if (args[0] === "install" || args[0] === "check") options.command = args.shift();
  while (args.length) {
    const arg = args.shift();
    if (arg === "--scope") options.scope = args.shift();
    else if (arg === "--agents") options.agents = args.shift();
    else if (arg === "--project-root") options.projectRoot = args.shift();
    else if (arg === "--home") options.homeDir = args.shift();
    else if (arg === "--copy") options.copy = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function render(entries, json) {
  if (json) return console.log(JSON.stringify(entries, null, 2));
  for (const entry of entries) {
    const status = entry.action ? `${entry.status} (${entry.action})` : entry.status;
    console.log(`${status.padEnd(18)} ${entry.target} [${entry.agents.join(", ")}]`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  const root = path.resolve(options.projectRoot ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
  const plan = buildInstallPlan({
    projectRoot: root,
    homeDir: path.resolve(options.homeDir ?? os.homedir()),
    scope: options.scope,
    agents: parseAgentSelection(options.agents),
  });
  const result = options.command === "check" ? await inspectPlan(plan) : await installPlan(plan, options);
  render(result, options.json);
  if (options.command === "check" && result.some((entry) => entry.status !== "installed")) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
