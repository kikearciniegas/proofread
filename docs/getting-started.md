# Getting started

## Requirements

Install Node.js 20 or newer and Git. Harper CLI 2.x is optional; when it is
absent, the skill still performs human grammar and style review but must disclose
that the deterministic English lint baseline was skipped.

Check the local environment:

```bash
npm run doctor
```

## Install the skill

User scope makes the skill available across projects:

```bash
npm run install:agents -- --scope user
```

Project scope creates repository-local discovery entries:

```bash
npm run install:agents -- --scope project
```

By default, one canonical `skills/proofread` folder is linked into the universal,
Codex, and Claude discovery locations. Add `--copy` when links are unsuitable.
Use `--agents codex,claude` to select a subset.

## First use

Give the agent pasted text or a file and state the desired depth when it matters:

```text
Proofread this for grammar only.
Copy-edit docs/guide.md and show the diff before changing it.
Polish this in UK English but preserve the informal voice.
Review translated.md against source.md for omissions and terminology errors.
```

For existing files, the default is a proposed diff. The source changes only
after approval. Saying “apply the changes directly” authorizes that write but
does not relax the meaning-preservation rules.

For translated-text review, provide both the source and translation when you
need accuracy or completeness checked. Without the source, Proofread can review
only fluency, grammar, consistency, and register. Optional companion skills are
used only when already available and explicitly relevant; see
[Optional interoperability](interoperability.md).

## Verify discovery

```bash
npm run check:agents -- --scope user
```

Restart an agent after installing if it caches its skill list.
