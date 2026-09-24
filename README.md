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
- Reviews translated text for fluency and, when the source is supplied,
  accuracy, omissions, terminology, structure, and register;
- Optionally composes with compatible style and translation-review skills when
  the current agent already exposes them;
- Approval-gated writes for existing files;
- Shared installation for Codex, Claude Code, Gemini CLI, GitHub Copilot,
  Cursor, OpenCode, Windsurf, and Devin.
- Desktop distributions for Claude Skills, native Claude Code/Cowork plugins,
  ChatGPT/Codex plugins, and Gemini Gems.

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

### Native Claude plugin

Claude Code users can install the native plugin from this repository:

```text
/plugin marketplace add kikearciniegas/proofread
/plugin install proofread@proofread
```

Use `/proofread:proofread` to invoke its packaged skill. Cowork users can add
`https://github.com/kikearciniegas/proofread` under Customize → Plugins or
upload `proofread-claude-plugin.zip` from the latest release. See
[Claude plugin distribution](docs/claude-plugin.md) for validation, runtime
limitations, and submission instructions.

## Optional companion skills

Proofread remains fully functional by itself. When the user requests a
specialized pass and the current agent exposes it, Proofread can compose with
`stop-slop`, `humanizer`, `watermarks-remover:clean-user-facing-text`, or
[`translation-quality`](https://github.com/senshinji/claude-translation-skill).
It never installs or assumes those companions. Proofread's meaning, voice,
protected-content, and approval rules always win.

See [Optional interoperability](docs/interoperability.md) for activation rules,
safe ordering, translation-review requirements, and platform limitations.

## Desktop apps

Use the hosted version directly: [Open Proofread as a shared Gemini Gem](https://gemini.google.com/gem/1xQ_c5-mPSw4NMm5TiTQbH-rdZ5uMNCJC?usp=sharing).

Download the current packages from
[GitHub Releases](https://github.com/kikearciniegas/proofread/releases/latest),
or build all desktop distributions locally with:

```bash
npm run package:desktop
```

This creates:

- `dist/proofread-claude-desktop.zip` for Claude's Customize → Skills upload;
- `dist/proofread-claude-plugin.zip` for Claude Code and Cowork plugin install;
- `dist/proofread-chatgpt-plugin.zip` for ChatGPT/Codex plugin testing and
  skills-only plugin submission;
- `dist/proofread-gemini-instructions.md` for a Gemini Gem.

See [Desktop application support](docs/desktop-apps.md) for capabilities and
installation steps. See [Claude plugin distribution](docs/claude-plugin.md) for
the marketplace, direct-upload, validation, and submission paths. Public
directory availability requires vendor review; building a ZIP does not bypass
that process.

The release also includes `manifest.json` with a SHA-256 checksum for every
artifact. Generated files under `dist/` are disposable and are not committed.

## Use

Ask your agent to proofread pasted text or a file. Examples:

```text
Proofread this paragraph for grammar only.
Polish README.md, preserve my tone, and show me the diff before applying it.
Copy-edit docs/guide.md using UK spelling and apply the approved changes.
Review translated.md against source.md and separate accuracy fixes from style edits.
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
- [Optional interoperability](docs/interoperability.md)
- [Desktop application support](docs/desktop-apps.md)
- [Distribution formats and verification](docs/distribution-format.md)
- [ChatGPT plugin submission](docs/chatgpt-plugin-submission.md)
- [Security and privacy](docs/security-and-privacy.md)
- [Development](docs/development.md)

## License

MIT. See [LICENSE](LICENSE), [NOTICE.md](NOTICE.md), and
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
