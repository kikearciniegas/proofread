# Optional interoperability

Proofread v0.3.0 is self-contained and has no required companion skill. It can
use specialized skills already exposed by the current agent when the user asks
for the corresponding review. It does not download, install, or search private
directories for them.

## Compatibility matrix

| Companion | Use | Activation | Required? |
| --- | --- | --- | --- |
| Harper CLI 2.x | Repeatable English lint baseline | Automatically when executable; disclose when skipped | no |
| `stop-slop` | Formulaic prose and filler review | User asks for AI-pattern or slop cleanup | no |
| `humanizer` | Naturalness and voice-aware polish | User asks to humanize or explicitly names it | no |
| `watermarks-remover:clean-user-facing-text` | Authorized reader-facing text hygiene | User asks for cleanup or explicitly names it | no |
| [`translation-quality`](https://github.com/senshinji/claude-translation-skill) | Rigorous source-versus-translation review | User supplies a source and requests professional translation review | no |

Availability is determined from the skills and tools the host exposes in the
current session. A similarly named local folder is not evidence that the agent
can invoke it. If a requested companion is absent, Proofread uses its built-in
workflow and reports the fallback.

## Safe composition order

For an explicitly requested enhanced review, the order is:

1. Harper baseline for an English target, when installed.
2. Source-accuracy review for translated text, optionally through
   `translation-quality`.
3. Proofread's minimal grammar and accuracy corrections.
4. Requested `stop-slop`, `humanizer`, and `clean-user-facing-text` passes, in
   that order, each no more than once.
5. Final Harper check, Unicode scan, protected-span guard, and word diff.

The final checks run after every companion so a later rewrite cannot bypass the
meaning and protected-content safeguards.

## Conflict policy

Proofread overrides any companion instruction that would:

- change or remove a claim, qualification, name, number, citation, quotation,
  disclosure, code span, identifier, or source language;
- invent personal experience, opinion, evidence, or a voice absent from the
  source;
- impose a universal ban on passive voice, adverbs, dashes, sentence length, or
  another valid choice;
- strip provenance metadata or promise that text evades an AI detector;
- write over an existing file beyond the user's authorization.

The Watermarks Remover integration is limited to its
`clean-user-facing-text` skill. Proofread does not automatically invoke the
broader `remove-ai-marks` workflow.

## Translation review

The reviewed translation and its source are separate inputs. With both,
Proofread checks for fabrication, omission, terminology errors, changed names
or numbers, structural drift, and unsuitable register. It then proofreads the
target language.

Without the source, Proofread can assess only target-language grammar, fluency,
consistency, and register. It must say that accuracy and completeness were not
verified. It does not silently generate a new translation.

The optional `translation-quality` project is MIT-licensed and designed for
Claude Code Agent Teams. Proofread requests only its review capability unless
the user separately asks for translation, team orchestration, terminology web
research, typesetting, or document generation. Its upstream repository is not
vendored into Proofread.

## Platform behavior

Filesystem agents such as Codex, Claude Code, and Gemini CLI can compose with a
companion when that host exposes it. Claude Desktop, ChatGPT, and Gemini Apps
may isolate uploaded skills or lack another project's runtime. On those
surfaces, Proofread falls back to its built-in rules rather than claiming the
companion ran.
