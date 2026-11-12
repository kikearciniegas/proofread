# Development

## Checks

```bash
npm test
npm run docs:check
npm run validate:skill
npm run validate:plugin
npm run validate:claude
npm run validate:claude:official
npm run package:desktop
npm run install:agents -- --scope project --dry-run
```

Tests use only Node.js standard-library modules and temporary directories. They
do not require Harper or network access. Distribution tests require the system
`zip` and `unzip` utilities. Generated `dist/` contents are ignored and may be
deleted after inspection.

## Design rules

- Keep `skills/proofread` canonical and self-contained.
- Preserve the approval boundary for existing files.
- Keep deterministic helpers read-only with respect to document contents.
- Add protected-span patterns only when they have a low false-positive rate and
  a fixture that demonstrates meaningful behavior.
- Treat Harper output as a baseline, not authority.
- Do not add dependencies on a particular agent's plugin marketplace.
- Update documentation and tests with every public behavior change.
- Keep the package, portable/OpenAI manifests, Anthropic manifest, and Claude
  marketplace versions synchronized. `SKILL.md` intentionally carries no
  version or interface metadata; OpenAI interface settings belong in
  `skills/proofread/agents/openai.yaml`.
- Treat the Gemini adapter as a reduced-capability edition; never imply that it
  ran local helper commands.

## Releases

1. Update the version in `package.json`, `plugin.json`,
   `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, and
   `.claude-plugin/marketplace.json`.
2. Run every check listed above from a clean checkout, review legal notices, and
   verify copy-mode installation in a temporary home directory.
3. Commit and push the versioned sources. Wait for CI and CodeQL on that exact
   commit.
4. Create and push an annotated `vX.Y.Z` tag pointing to the verified commit.
5. The Release workflow rebuilds the artifacts and creates the GitHub release.
   Download the published files and compare their SHA-256 values with the
   published `manifest.json`.

Do not commit `dist/`. Do not create the GitHub release manually before pushing
the tag: the workflow owns release creation. Publishing the GitHub package does
not submit or publish the plugin in ChatGPT; follow
[ChatGPT plugin submission](chatgpt-plugin-submission.md) separately.
Anthropic directory publication is also separate; follow
[Claude plugin distribution](claude-plugin.md).
