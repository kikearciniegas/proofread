# Agent compatibility

The installer follows a shared-discovery model:

| Agents | Discovery path |
| --- | --- |
| Codex | `.codex/skills/proofread` |
| Claude Code | `.claude/skills/proofread` |
| Gemini CLI, GitHub Copilot, Cursor, OpenCode, Windsurf, Devin | `.agents/skills/proofread` |

This produces no more than three entries even when all supported agents are
selected. Every entry resolves to `skills/proofread`, which remains the canonical
source.

Project-scope links are relative so a cloned repository can move with its links
intact. User-scope links are absolute. Copy mode creates standalone skill folders
for environments that cannot follow symbolic links.

The installer never overwrites an unrelated path. Resolve a reported `conflict`
manually after confirming whether it is an independent skill or an obsolete
copy. There is intentionally no force or uninstall mode.

The portable skill has no dependency on Claude-specific plugin names. Agent
clients may add their own editing capabilities, but the canonical workflow must
remain usable without them.

Consumer desktop applications use the separately built distributions described
in [Desktop application support](desktop-apps.md). The filesystem installer
targets coding-agent discovery paths; it does not install cloud-hosted Claude
skills, publish ChatGPT plugins, or create Gemini Gems.
