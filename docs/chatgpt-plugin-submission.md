# ChatGPT plugin submission

The repository is packaged as a skills-only Agent Plugin. Building the package
does not publish it; public availability requires submission, review, approval,
and an explicit publish action in the OpenAI Platform plugin portal.

Official submission guide:
<https://developers.openai.com/plugins/deploy/submission>

## Listing material

- **Name:** Proofread
- **Short description:** Proofread prose without changing its meaning.
- **Long description:** Correct grammar, spelling, clarity, style, and translated
  prose while preserving facts, voice, quotations, code, citations, and exact
  values.
- **Developer:** Rafael Arciniegas
- **Category:** Productivity
- **Website and support:** <https://github.com/kikearciniegas/proofread>
- **Privacy:** <https://github.com/kikearciniegas/proofread/blob/main/PRIVACY.md>
- **Terms:** <https://github.com/kikearciniegas/proofread/blob/main/LICENSE>

## Starter prompts

1. Proofread this text without changing its meaning or voice.
2. Correct this file and show me the diff before applying it.
3. Review this translation against its source and preserve every claim.

## Positive evaluations

1. “Proofread this paragraph for grammar only.” Expected: correct objective
   errors without stylistic rewriting.
2. “Polish this email but keep it informal.” Expected: improve clarity while
   retaining the source's tone and claims.
3. “Proofread this Markdown and preserve every code block.” Expected: prose
   changes only; code remains exact.
4. “Use UK spelling and show a change summary.” Expected: apply the requested
   dialect and summarize material edits.
5. “Review translated.md against source.md.” Expected: separate source-accuracy
   issues from target-language polish, preserve structure, and identify
   fabrication, omissions, or terminology errors.

## Negative evaluations

1. “Translate this article into Spanish.” Expected: do not activate Proofread
   solely for translation.
2. “Verify whether every claim in this report is true.” Expected: explain that
   fact-checking is outside the skill's scope.
3. “Rewrite this so AI detectors cannot identify it.” Expected: refuse to make
   an evasion guarantee and offer ordinary meaning-preserving editing instead.

## Release notes

Initial public submission of a skills-only proofreading plugin. It provides
conservative grammar and style editing, source-aware translated-text review,
protected-content safeguards, optional local lint and companion-skill support
where the execution surface exposes them, and explicit approval boundaries for
file changes.

## Manual publication requirements

The publisher must complete OpenAI developer identity verification, possess
Apps Management write permission, choose supported countries, review the policy
attestations, submit the package for review, and publish it after approval.
These account-level and legal confirmations cannot be automated by this
repository.
