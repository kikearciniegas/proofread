# CLI reference

## Proofreading helper

```bash
node skills/proofread/scripts/proofread.mjs COMMAND [arguments]
```

| Command | Purpose | Exit behavior |
| --- | --- | --- |
| `doctor` | Report Node.js, Git, and Harper availability | nonzero only when required Git is unavailable |
| `lint PATH --dialect us` | Run Harper on one verified file | preserves Harper's `0`/`1` lint status; other failures are errors |
| `scan PATH` | Report suspicious invisible Unicode | always reports JSON and does not modify the file |
| `guard ORIGINAL DRAFT` | Compare common protected spans | `0` when equal, `2` on mismatch |
| `diff ORIGINAL DRAFT` | Print a color-free word diff | differences are normal and do not produce a wrapper error |

`lint` supports `us`, `uk`, `au`, and `ca`. The helper checks that a path is a
readable file before invoking Harper so a missing path cannot be misread as text.

`scan` reports zero-width characters, soft hyphens, byte-order marks, word
joiners, and bidirectional controls. It does not remove them.

## Installer

```bash
node scripts/install-agent-skill.mjs install [options]
node scripts/install-agent-skill.mjs check [options]
```

| Option | Meaning |
| --- | --- |
| `--scope project\|user` | Select repository-local or home-directory installation |
| `--agents all\|a,b,c` | Install a supported subset |
| `--copy` | Copy the canonical skill instead of linking it |
| `--dry-run` | Inspect the plan without writing |
| `--json` | Emit machine-readable results |
| `--project-root PATH` | Override the source repository, mainly for tests |
| `--home PATH` | Override the home directory, mainly for tests |

Supported agent names are `codex`, `claude`, `gemini`, `copilot`, `cursor`,
`opencode`, `windsurf`, and `devin`.

## Distribution builder

```bash
npm run package:desktop
npm run package:desktop -- --out /absolute/output/path
```

The builder requires the system `zip` command and writes three application
artifacts plus `manifest.json`. It deletes and recreates only the selected
output directory before building, so do not point `--out` at a directory that
contains unrelated files. The default output is the ignored repository-local
`dist/` directory.

The test suite additionally uses `unzip` to inspect archive layouts. Neither
tool is a runtime dependency of the installed proofreading skill.
