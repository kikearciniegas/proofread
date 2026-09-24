# Security and privacy

## Local behavior

The bundled Node.js scripts use no network APIs and collect no telemetry. They
read only explicit input paths and print results to standard output or standard
error. They do not modify document contents.

Child processes receive argument arrays with `shell: false`; filenames are not
interpolated into shell commands. The lint helper verifies file readability
before calling Harper.

## File writes

An agent should edit a temporary copy. It may replace the original only after
the user approves the shown diff or explicitly requests direct application.
The installer writes only missing skill-discovery paths and refuses conflicts.

## Sensitive text

Proofread only material the user placed in scope. Temporary copies and command
output can contain confidential text. Keep them out of public repositories,
issues, screenshots, and logs, and remove temporary copies when the task ends.

Harper runs locally. The surrounding agent client may process text through its
own service; its privacy terms are outside this repository.

## Desktop distributions

The packaged skill and Gem adapter add no analytics, network client, credential
access, or external data store. They run within the selected host application,
which may upload prompts, documents, outputs, or diagnostics to its own service.
Review the host's plan, retention, training, region, and sharing controls before
using confidential material.

The release manifest contains only artifact metadata and hashes. It never
contains proofread text. The public GitHub release contains the skill code,
instructions, assets, and legal notices—not user documents.

## Authorship and detector claims

The skill improves writing quality. It must not claim to certify human
authorship, defeat a detector, remove a secret watermark, or conceal required
disclosures. Such claims are unsupported and outside the proofreading workflow.
