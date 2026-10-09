# Testing Atlas repository instructions

## Product context

Read `docs/PRODUCT_VISION.md` and `docs/VERSION_CONTROL.md` before changes. The owner's current instructions take precedence over these defaults. The goal is useful testing guidance across software and hardware for testers of all levels, with web and mobile as priorities.

Version 0.1.0 uses predefined blueprints. Do not describe it as an AI agent trained on ISTQB/ASTQB documents or as a system that executes tests. Reference links do not establish passage-level citations, product-specific acceptance limits, or complete coverage.

## Scope and cost

- Work on one requested outcome at a time and preserve accepted behavior.
- Keep public-beta inputs public, synthetic, or redacted.
- Keep the beta free and respect the development budget of under $30/month including the owner's existing ChatGPT subscription. Make added service costs explicit before committing to them.
- Preserve source attribution and check document versions and reuse permissions before adding a document corpus.
- Use product specifications for hardware limits and approved procedures. Do not invent pass/fail thresholds.

## Git and release discipline

- Keep `baseline/v0.1.0` at `337f052f49f33b4ba79977e42944631d57139980`.
- Read the latest remote state before writing. Create an `iteration/<short-description>` branch for future app changes.
- Never overwrite other changes or force-push `main` or checkpoints.
- Use pull requests to explain the final change and its validation. Merge and deploy only within the user's authorization; avoid unnecessary confirmation gates.
- Update `CHANGELOG.md` with behavior, verification, and meaningful limits. Save a checkpoint after a validated app release.
- GitHub and Sites have separate source histories. Preserve Site identity and use the supported Sites workflow when deployment is requested. Do not treat a GitHub commit as a deployment.
- Keep credentials, generated build output, and runtime state out of commits. Use tracked source files when synchronizing snapshots.

## Validation

- For application source changes, run `pnpm lint` and `pnpm build` once after the final edit; repeat only after further changes or failures.
- Choose targeted checks that verify meaningful behavior, especially blueprint generation, draft recovery, and exports when affected.
- Check responsive layout and keyboard use when changing the interface, using available supported preview tools. Record unavailable browser checks clearly.
- Do not add tests that merely mirror low-impact implementation changes. Documentation-only edits need content and link checks, not an app rebuild.
- A review marker represents user review, not an executed or passed test.
