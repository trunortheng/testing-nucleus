# Change log

Record user-visible behavior, fixes, validation, and known limits for each released iteration. Draft changes belong under Unreleased until the release checkpoint exists.

## Unreleased

### Project controls

- Saved the original app snapshot as `baseline/v0.1.0`.
- Added the product vision, iteration and rollback process, and repository instructions.
- Added app-specific information to the README while retaining framework instructions.
- This documentation update does not change app behavior or deploy a new Site version.

### Validation

- Documentation links and baseline references checked.
- Lint/build not repeated for this documentation-only update.

## 0.1.0 — 2026-10-09

### Starting behavior

- Describe a target and select its testing area, goal, and experience level.
- Create a predefined testing blueprint for web, mobile, hardware, firmware/IoT, API, or AI systems.
- Explore component layers, suggested checks, assumptions, and external reference links.
- Mark checks as reviewed, add notes, and save a draft in the current browser.
- Export a plan as Markdown or CSV.

### Validation and limits

- `pnpm lint` and `pnpm build` passed before upload.
- All 117 tracked files matched the tested local source tree at upload.
- End-to-end browser checks were not recorded.
- Guidance is template-based; AI generation, document retrieval, requirement-specific case generation, and server-saved projects are future work.
- A reviewed check is not evidence that a test was executed or passed.

### Checkpoint

- GitHub branch: `baseline/v0.1.0`.
- GitHub commit: `337f052f49f33b4ba79977e42944631d57139980`.
- Original Site source commit: `d8bfc3d219b2c406e353318131192a7acb26e9e7`.
- Matching source tree: `b5b074670e568dfc772f2b96bd17717aa358a1ef`.
