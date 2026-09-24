# Development

## Checks

```bash
npm test
npm run docs:check
npm run validate:skill
npm run validate:plugin
npm run package:desktop
npm run install:agents -- --scope project --dry-run
```

Tests use only Node.js standard-library modules and temporary directories. They
do not require Harper or network access.

## Design rules

- Keep `skills/proofread` canonical and self-contained.
- Preserve the approval boundary for existing files.
- Keep deterministic helpers read-only with respect to document contents.
- Add protected-span patterns only when they have a low false-positive rate and
  a fixture that demonstrates meaningful behavior.
- Treat Harper output as a baseline, not authority.
- Do not add dependencies on a particular agent's plugin marketplace.
- Update documentation and tests with every public behavior change.
- Keep the package, skill, and plugin manifest versions synchronized.
- Treat the Gemini adapter as a reduced-capability edition; never imply that it
  ran local helper commands.

## Releases

Update the package and skill metadata versions together. Run all checks from a
clean checkout, review third-party notices, and verify copy-mode installation in
a temporary home directory before tagging a release.
