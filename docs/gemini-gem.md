# Gemini Gem publication

Proofread is available as a shared Gemini Gem:

[Open Proofread in Gemini](https://gemini.google.com/gem/1xQ_c5-mPSw4NMm5TiTQbH-rdZ5uMNCJC?usp=sharing)

The Gem is a reduced-capability adapter for Gemini Apps. It preserves the core
editing rules but cannot run this repository's local Harper, Unicode scan,
protected-span guard, or Git diff helpers. It must never claim those checks ran.

## Create or replace the Gem

1. Download `proofread-gemini-instructions.md` from the
   [latest release](https://github.com/kikearciniegas/proofread/releases/latest).
2. Open <https://gemini.google.com/>, select Gems, and create a new Gem.
3. Name it `Proofread` and paste the complete artifact into the instructions
   field. Do not add the instructions as a knowledge file.
4. Do not upload repository files or user documents as permanent Gem knowledge.
5. Preview the Gem, run the smoke tests below, and save it.

Google's creation instructions:
<https://support.google.com/gemini/answer/15146780>

## Share it

Open the Gem manager, select Share next to Proofread, and choose the appropriate
general-access setting. Use Viewer access for public users; Editor access allows
other people to modify or delete the Gem. Google may expose Public, Anyone with
the link, organization-only, or private access depending on the account type.

Anyone with access may be able to view the Gem's instructions and any uploaded
files. This Gem therefore uses instructions only and intentionally has no
knowledge-file dependency. Work or school accounts may not offer every public
sharing option.

Google's sharing instructions:
<https://support.google.com/gemini/answer/16504957>

Google documents Gem sharing as the distribution path. This repository does
not claim that the shared Gem has passed a separate curated marketplace review.

## Smoke tests

Run these checks before publishing a new or updated Gem:

1. Ask it to correct `She go to the office every day.` The correction should be
   `She goes to the office every day.`
2. Provide prose containing a URL, version number, quotation, and inline code.
   Confirm that all protected values remain exact.
3. Request grammar-only editing and confirm that it does not broadly rewrite
   the voice or add facts.
4. Provide a translation without its source. Confirm that the Gem limits its
   review to fluency, grammar, consistency, and register and discloses that
   accuracy and completeness were not verified.
5. Ask whether Harper, the Unicode scanner, the guard, or Git diff ran. Confirm
   that the Gem says those local checks are unavailable in Gemini Apps.

Do not use confidential or personal text in publication smoke tests.

## Update procedure

The shared Gem does not update automatically when this repository changes. For
every release that changes `adapters/gemini/GEM_INSTRUCTIONS.md`:

1. Build or download the new `proofread-gemini-instructions.md` artifact.
2. Compare it with the currently published Gem instructions.
3. Replace the Gem instructions, preview the changes, and rerun every smoke
   test above.
4. Save the Gem and confirm that the canonical share URL still opens.
5. Update the README and current GitHub release notes if the share URL changed.
6. Keep the old link out of documentation and release notes after confirming
   the replacement works.

The canonical share URL is stored in the README, this guide, and the desktop
application guide. Documentation tests enforce those three locations.
