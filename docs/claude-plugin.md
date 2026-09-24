# Claude Code and Cowork plugin

Proofread ships a native Anthropic plugin in addition to its portable filesystem
skill. Both distributions use the canonical `skills/proofread` source.

## Install from the public marketplace repository

In Claude Code, run these commands inside an interactive session:

```text
/plugin marketplace add kikearciniegas/proofread
/plugin install proofread@proofread
```

Restart Claude Code or run `/reload-plugins` if the installation summary asks
you to reload. Invoke the packaged skill as `/proofread:proofread`; the shorter
`/proofread` alias may also be available when it does not conflict.

In Cowork, open Customize → Plugins → Add marketplace, enter
`https://github.com/kikearciniegas/proofread`, install Proofread, and enable its
skill. Cowork syncs enabled plugins into new sessions.

## Install from a release file

Download `proofread-claude-plugin.zip` from the
[latest release](https://github.com/kikearciniegas/proofread/releases/latest).
In Cowork, open Customize → Plugins, choose the upload option, select the ZIP,
and enable Proofread. The ZIP places `.claude-plugin/plugin.json` at its root as
required by Anthropic.

The older `proofread-claude-desktop.zip` remains available for Customize →
Skills. It is a standalone skill package, not a plugin package.

## Validate locally

Run the repository's deterministic checks, followed by Claude Code's validator:

```bash
npm run validate:claude
npm run validate:claude:official
```

The official command requires Claude Code on `PATH`. CI installs a pinned Claude
Code version and runs both checks before any release.

## Verification coverage

Repository automation and the release process cover these checks:

- Validates `.claude-plugin/plugin.json` and
  `.claude-plugin/marketplace.json` with Claude Code's official validator.
- Builds the plugin ZIP and verifies its required root layout and SHA-256 hash.
- Runs the unit, documentation, and portability checks in CI and again in the
  release workflow.
- Requires the release commit's separate CodeQL analysis to pass before the
  version tag is created.

The public v0.4.0 release received additional manual verification. Its published
checksums matched `manifest.json`; the unpacked artifact passed both official
manifest validators; `/proofread:proofread` completed a live request through
`claude --plugin-dir`; and the public GitHub marketplace installed successfully
in an isolated Claude configuration. Claude reported version `0.4.0`, one
enabled `proofread` skill, and no agents, hooks, MCP servers, or LSP servers.

CI does not sign in to a publisher's Claude account or change Cowork account
settings. Before directory submission, perform this account-level smoke test:

1. Upload the release ZIP in Customize → Plugins, or install it from the public
   marketplace.
2. Start a new Cowork session so enabled plugins are synchronized.
3. Confirm that Proofread appears in the installed plugin and skill lists.
4. Invoke `/proofread:proofread` on a short sentence and on a disposable file.
5. Confirm that the result preserves names, numbers, quotations, URLs, and code,
   and that it discloses any skipped Harper or helper-script check.
6. Remove the disposable test file and disable the test installation if it is
   not the account's intended production copy.

## Runtime notes

Core proofreading requires no external companion skill. Node.js 20+ and Git are
needed for bundled lint, guard, and diff helpers. Harper CLI is optional. When a
Cowork environment does not expose a helper or Harper, Proofread must disclose
the skipped automated baseline and continue with human review; it must never
claim a check ran when it did not.

## Submit to Anthropic

The repository must remain public. Before submitting, verify the current release
with `claude plugin validate`, then submit its GitHub repository through either
official form:

- Claude.ai: <https://claude.ai/admin-settings/directory/submissions/plugins/new>
- Anthropic Console: <https://platform.claude.com/plugins/submit>

Anthropic's directory submission is separate from GitHub Releases and OpenAI's
Plugins Directory. Approval is controlled by Anthropic.

Official references:

- <https://code.claude.com/docs/en/plugins>
- <https://code.claude.com/docs/en/plugins-reference>
- <https://code.claude.com/docs/en/plugin-marketplaces>
- <https://claude.com/docs/cowork/guide/plugins>
- <https://claude.com/docs/plugins/submit>
