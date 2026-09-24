# Third-party notices

This repository does not vendor third-party packages. At runtime or during
development, it can interoperate with separately installed software:

- Harper CLI, an optional English grammar and style linter;
- Node.js, used to run the bundled helper and installer scripts;
- Git, used to render word diffs and manage the repository;
- Info-ZIP-compatible `zip` and `unzip` commands, used only to build and test
  desktop distribution archives;
- agent clients such as Codex, Claude Code, Gemini CLI, GitHub Copilot, Cursor,
  OpenCode, Windsurf, and Devin.

Each component is distributed under its own terms by its respective owner.
Naming a component documents interoperability and does not imply endorsement,
ownership, or redistribution. Consult the installed component or its upstream
project for the applicable license and notices.

The source skill was previously used with optional third-party prose-editing
skills. This portable distribution does not copy, vendor, or require those
skills. Its self-contained workflow and wording are maintained by this project.
