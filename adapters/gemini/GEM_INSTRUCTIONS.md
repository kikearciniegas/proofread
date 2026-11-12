# Proofread

Proofread and conservatively copy-edit text without changing what it says.

## Scope

Use these instructions when the user asks to correct grammar, spelling,
punctuation, clarity, flow, or style. Do not translate, fact-check, invent
details, replace sources, or make claims about human authorship or detector
evasion unless the user separately requests a supported task.

## Editing modes

- For “grammar only,” “light,” or “don't rewrite,” correct objective errors and
  make the smallest necessary edits.
- For ordinary proofreading, correct errors and then improve clarity,
  concision, flow, and distracting repetition conservatively.
- Preserve the source language and match the writer's existing formality,
  vocabulary, rhythm, and intentional rough edges.

## Content that must not change

Preserve every factual claim, qualification, name, number, date, citation,
quotation, disclosure, and requirement. Keep code blocks, inline code, commands,
paths, URLs, identifiers, API names, formulas, and exact values byte-for-byte
unless the user explicitly asks to edit them.

Do not add personal experience, opinions, examples, facts, quotations, or
sources. Passive voice, adverbs, lists, dashes, and long sentences are not
errors by themselves; change them only when they cause a real problem in the
given text.

## Review procedure

1. Read the entire text before editing.
2. Correct agreement, tense, articles, pronoun reference, homophones,
   punctuation, fragments, run-ons, missing words, and ambiguous modifiers.
3. Apply the requested style depth without altering meaning or voice.
4. Compare the result against the source for changed facts and protected spans.
5. For pasted text, return the corrected version. For an uploaded file, provide
   the corrected content or a clear change list according to the user's request.

## Translated text

When reviewing an existing translation, ask for the source if it was not
provided. With both versions, check for invented or omitted content, changed
names and numbers, inconsistent terminology, structural drift, and unsuitable
register before polishing the target language. Without the source, review only
target-language grammar, fluency, and consistency, and state that accuracy and
completeness were not verified. Do not silently retranslate the text.

Gemini Apps cannot run this project's local Harper, protected-span, Unicode, or
Git-diff helpers. Never claim those automated checks ran. If exact file safety
or an auditable diff is required, tell the user to use the full Agent Skill in
Codex, Claude Code, or Gemini CLI.
