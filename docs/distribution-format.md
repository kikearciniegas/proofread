# Distribution formats and verification

The canonical source is `skills/proofread/`. Application packages adapt that
source without maintaining independent copies of the full skill.

## Generated files

| File | Contents | Intended use |
| --- | --- | --- |
| `proofread-claude-desktop.zip` | One top-level `proofread/` Agent Skill folder | Upload through Claude's Skills interface |
| `proofread-claude-plugin.zip` | Anthropic manifest, marketplace catalog, canonical skill, and legal notices | Claude Code or Cowork plugin install |
| `proofread-chatgpt-plugin.zip` | Root Agent Plugin manifest, OpenAI overlay, canonical skill, logo, and legal notices | Plugin testing and OpenAI submission |
| `proofread-gemini-instructions.md` | Reduced-capability editorial instructions | Paste into a Gemini Gem |
| `manifest.json` | Version, build timestamp, filenames, targets, and SHA-256 hashes | Artifact integrity verification |

Both Claude archives and the ChatGPT archive include the same canonical
`SKILL.md`, helper script, references, license, and notices. The Gemini file is
deliberately separate because Gemini Apps do not expose the local Node.js helper
runtime; it must not claim that Harper, Unicode scanning, protected-span checks,
or Git diffs ran.

## Plugin manifests

`plugin.json` is the portable Agent Plugin manifest. It owns common identity,
version, author, listing text, prompts, links, and visual assets.
`.codex-plugin/plugin.json` is the OpenAI compatibility overlay and declares the
`skills/` directory. `.claude-plugin/plugin.json` is the native Anthropic
manifest, while `.claude-plugin/marketplace.json` makes the public repository a
Claude marketplace. All manifests and `package.json` use the same semantic
version. `npm run validate:plugin` and `npm run validate:claude` enforce this.

## Local build

Install Node.js 20 or newer plus the system `zip` utility, then run:

```bash
npm run package:desktop
```

Use `npm run package:desktop -- --out /absolute/path` to select another output
directory. The builder removes and recreates the selected directory, packages
only the allowlisted project paths, excludes `.DS_Store`, and hashes the final
files. The default `dist/` directory is ignored by Git and can be deleted after
verification.

## Verify a downloaded release

Keep `manifest.json` beside the four artifacts. On macOS or Linux, compare the
reported values with:

```bash
shasum -a 256 proofread-claude-desktop.zip
shasum -a 256 proofread-claude-plugin.zip
shasum -a 256 proofread-chatgpt-plugin.zip
shasum -a 256 proofread-gemini-instructions.md
```

On Windows PowerShell, use:

```powershell
Get-FileHash .\proofread-claude-desktop.zip -Algorithm SHA256
Get-FileHash .\proofread-claude-plugin.zip -Algorithm SHA256
Get-FileHash .\proofread-chatgpt-plugin.zip -Algorithm SHA256
Get-FileHash .\proofread-gemini-instructions.md -Algorithm SHA256
```

A mismatch means the file is incomplete or differs from the release build; do
not install it. GitHub also exposes a digest for each uploaded release asset.

## Validation coverage

`npm test` builds packages in a temporary directory and verifies the archive
layouts, required files, manifest version, and every checksum. CI also validates
the skill, validates the portable, OpenAI, and Anthropic manifests with both
repository checks and Claude Code's official validator, rebuilds all
distributions, checks documentation, and exercises a dry-run installation plan.
CodeQL runs independently on repository changes.
