# Workflow and guarantees

## Pipeline

```text
source text
   │
   ├─► temporary working copy
   │      ├─► optional Harper baseline
   │      ├─► human grammar correction
   │      ├─► conservative style pass
   │      ├─► final Harper check
   │      ├─► Unicode scan + protected-span guard
   │      └─► word diff
   │
   └─► original file changes only after authorization
```

## Invariants

The workflow must preserve:

- factual claims and qualifications;
- names, numbers, dates, citations, quotations, and required disclosures;
- code, commands, paths, URLs, identifiers, formulas, and exact values;
- source language, formatting, and intentional voice choices.

Grammar-only mode stops before stylistic rewriting. Standard mode allows
meaning-preserving improvements to clarity, concision, rhythm, and repetition.
Translation-review mode compares the source and translated text before applying
target-language corrections. Without the source, it is a fluency review only,
not an accuracy or completeness check.

Optional companions never replace the final guard and diff. See
[Optional interoperability](interoperability.md) for their activation and order.

## Why Harper is optional

Harper provides a useful repeatable baseline for English, but a rule-based
linter can miss real errors and flag valid domain language. The agent must still
read the entire text, evaluate findings in context, and perform the protected
content and meaning review.

Non-English text skips Harper. The skill never translates merely because the
linter does not support the language.

## Guard limits

The helper detects changes to several structured span types, but no regex can
prove semantic equivalence. A passing guard does not detect a removed caveat,
renamed person, altered implication, or every unquoted identifier. The final
diff review remains mandatory.

## Acceptance criteria

A completed proofread has:

1. a declared editing depth and preserved source language;
2. a baseline lint result or an explicit reason it was skipped;
3. no unresolved protected-span mismatch;
4. no new unexplained lint findings;
5. a reviewed diff with no meaning drift;
6. no source-file write beyond the user's authorization.
