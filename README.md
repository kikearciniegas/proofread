# Proofread

A portable Agent Skill for conservative proofreading and copy-editing. It keeps
meaning and voice fixed, uses Harper CLI as an optional English lint baseline,
checks protected spans, and shows a diff before changing files.

The skill is self-contained and follows the open Agent Skills folder format. It
does not require the Claude plugins used by its original private version.

## What it does

- Grammar, spelling, punctuation, and word-choice correction;
- Optional clarity, concision, and flow improvements;
- Optional Harper CLI lint before and after editing;
- Checks for changes to code, URLs, paths, numbers, citations, and quotations;
- Audits suspicious invisible Unicode without removing it blindly;
- Approval-gated writes for existing files;
- Shared installation for Codex, Claude Code, Gemini CLI, GitHub Copilot,
  Cursor, OpenCode, Windsurf, and Devin.
- Desktop distributions for Claude Desktop, ChatGPT/Codex plugins, and Gemini
  Gems.

It does not fact-check, translate by default, invent missing details, or claim
that edited prose proves human authorship or bypasses AI detectors.

## Requirements

- Node.js 20 or newer
- Git
- Harper CLI 2.x, optional but recommended for English text

There are no npm runtime dependencies. Do not run `npm install` merely to use
the skill.

## Install

Clone the repository, then install discovery links for the agents you use:

```bash
git clone https://github.com/kikearciniegas/proofread.git
cd proofread
npm run install:agents -- --scope user
```

For a repository-local installation:

```bash
npm run install:agents -- --scope project
```

The installer preflights all targets and refuses to overwrite existing skills.
Use `--copy` where symbolic links are unsuitable, or `--agents codex,claude` to
install only a subset.

## Desktop apps

Build all desktop distributions with:

```bash
npm run package:desktop
```

This creates:

- `dist/proofread-claude-desktop.zip` for Claude's Customize → Skills upload;
- `dist/proofread-chatgpt-plugin.zip` for ChatGPT/Codex plugin testing and
  skills-only plugin submission;
- `dist/proofread-gemini-instructions.md` for a Gemini Gem.

See [Desktop application support](docs/desktop-apps.md) for capabilities and
installation steps. ChatGPT public availability requires OpenAI review and
publication in the universal Plugins Directory; building the ZIP does not
bypass that process.

## Use

Ask your agent to proofread pasted text or a file. Examples:

```text
Proofread this paragraph for grammar only.
Polish README.md, preserve my tone, and show me the diff before applying it.
Copy-edit docs/guide.md using UK spelling and apply the approved changes.
```

The bundled helper can also be inspected directly:

```bash
npm run doctor
node skills/proofread/scripts/proofread.mjs --help
```

## Documentation

- [Getting started](docs/getting-started.md)
- [Workflow and guarantees](docs/workflow.md)
- [CLI reference](docs/cli-reference.md)
- [Agent compatibility](docs/compatibility.md)
- [Desktop application support](docs/desktop-apps.md)
- [ChatGPT plugin submission](docs/chatgpt-plugin-submission.md)
- [Security and privacy](docs/security-and-privacy.md)
- [Development](docs/development.md)

## License

MIT. See [LICENSE](LICENSE), [NOTICE.md](NOTICE.md), and
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
