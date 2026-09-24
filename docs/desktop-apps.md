# Desktop application support

Run `npm run package:desktop` to create all artifacts under `dist/`. The command
also writes `manifest.json` with SHA-256 hashes.

Prebuilt packages are available from the
[latest GitHub release](https://github.com/kikearciniegas/proofread/releases/latest).
See [Distribution formats and verification](distribution-format.md) for archive
contents, local builds, and checksum verification.

## Claude Desktop

Artifact: `proofread-claude-desktop.zip`

1. Enable code execution and file creation in Claude settings.
2. Open Customize → Skills and choose Create skill → Upload a skill.
3. Upload the Claude ZIP and enable Proofread.

The archive contains one top-level `proofread/` folder and a description within
Claude's 200-character limit. Claude's hosted environment cannot use the
operator's locally installed Harper binary. Because Harper is optional, the
skill must disclose when it skips that baseline and continue with human review.

Official instructions: <https://support.claude.com/en/articles/12512180-use-skills-in-claude>

## ChatGPT and Codex

Artifact: `proofread-chatgpt-plugin.zip`

The repository root is a portable Agent Plugin with `plugin.json`; the
`.codex-plugin/plugin.json` file is its OpenAI compatibility overlay. The ZIP is
a skills-only plugin package for local testing and submission.

Public ChatGPT availability is not automatic. The publisher must upload the
skills-only package in the OpenAI plugin submission portal, provide listing
assets and evaluations, complete identity verification and policy attestations,
pass review, and publish the approved version. See
[ChatGPT plugin submission](chatgpt-plugin-submission.md).

Official packaging documentation:
<https://developers.openai.com/plugins/build/plugins>

## Gemini Apps and desktop

Artifact: `proofread-gemini-instructions.md`

1. In the Gemini web app, create a new Gem.
2. Name it `Proofread` and paste the artifact into the Gem instructions.
3. Save it, then use the Gem on Gemini Apps surfaces where the account exposes
   Gems.

Gemini Apps does not expose this project's local script runtime. The adapter
preserves the editorial rules but cannot run Harper, the Unicode scan, the
protected-span guard, or Git word diffs. It explicitly prohibits claiming those
checks ran.

Official Gem instructions:
<https://support.google.com/gemini/answer/15146780>

Creating a Gem copies the adapter instructions into the user's Gemini account;
updating this repository does not automatically update an existing Gem.

## Capability matrix

| Surface | Core proofreading | Bundled scripts | Local file diff | Distribution |
| --- | --- | --- | --- | --- |
| Codex app/CLI | yes | yes | yes | filesystem skill or plugin |
| Claude Code | yes | yes | yes | filesystem skill |
| Gemini CLI | yes | yes | yes | filesystem skill |
| Claude Desktop | yes | hosted execution only | hosted-file workflow | skill ZIP |
| ChatGPT | yes after plugin publication | surface-dependent | Work/plugin environment | plugin ZIP + review |
| Gemini Apps/Desktop | yes | no | no | Gem instructions |

“Yes” in the core-proofreading column describes the packaged instructions, not
proof that a vendor has accepted a public marketplace listing. Account-level
uploads, enablement, availability by plan or region, and marketplace review are
controlled by each application provider.
