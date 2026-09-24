# Gemini Apps adapter

Gemini Apps uses Gems rather than local Agent Skill discovery. Create a Gem in
the Gemini web app, copy the contents of `GEM_INSTRUCTIONS.md` into its
instructions, and save it. The Gem then becomes available on Gemini surfaces
supported by the user's account.

This adapter preserves the editorial workflow but cannot run local Node.js,
Harper CLI, protected-span, Unicode, or Git-diff helpers. It must not report
those checks as completed.
