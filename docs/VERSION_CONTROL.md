# Version control and iterations

## Baseline

| Item | Value |
| --- | --- |
| App | Testing Atlas |
| Repository | `trunortheng/testing-nucleus` |
| Initial app version | `0.1.0` |
| Saved checkpoint branch | `baseline/v0.1.0` |
| GitHub checkpoint commit | `337f052f49f33b4ba79977e42944631d57139980` |
| Original Site source commit | `d8bfc3d219b2c406e353318131192a7acb26e9e7` |
| Matching app source tree | `b5b074670e568dfc772f2b96bd17717aa358a1ef` |
| Hosted Site | `appgprj_6ac894d454d481919977164ed23ddc07` |

Checkpoint branches are preserved by project convention. This workflow does not configure GitHub branch-protection rules. Keep the baseline branch pointing to its original commit.

GitHub and Sites have separate source histories and deployment identifiers. The initial upload preserved identical tracked file contents, not identical commit history. Record both source identities and compare contents when synchronizing them.

## One iteration at a time

1. State the requested user outcome and a short acceptance checklist. Use the owner's latest direction and keep unrelated changes out of the iteration.
2. Read the current GitHub `main` head and current Site source before edits. If they have diverged, reconcile those changes rather than replace them with an older snapshot.
3. Create an `iteration/<short-description>` branch from current `main`. Implement the scoped change and keep useful work committed.
4. Validate the affected behavior. For code changes, run lint and build once on the final inputs, plus focused checks where they resolve a real risk. For documentation-only changes, check content, links, and references without rebuilding the app.
5. Present the resulting behavior and record changes, checks, and remaining limitations in a pull request and `CHANGELOG.md`. Record browser checks as unverified when they could not be performed.
6. Merge and publish within the user's authorized scope. Use an expected-head check for connector writes and never force-push over another change. A GitHub commit alone does not deploy the Site.
7. After a validated release, save a `checkpoint/v<version>` branch at its exact GitHub commit and record the deployed Site version/URL separately.

Existing authorization remains valid. Do not turn routine implementation choices into repeated permission requests. Seek clarification only when a material product decision is missing, the intended action is outside the request, or a tool requires it.

## Release numbers

- `0.1.0` is the first app baseline.
- Patch increments, such as `0.1.1`, describe fixes or small refinements.
- Minor increments, such as `0.2.0`, describe a substantial new capability or workflow. Before 1.0, record any compatibility changes explicitly.
- `1.0.0` is a deliberate production milestone, chosen when the agreed launch criteria are met.

Update `package.json` and the change log when releasing an app version. Documentation or project-control commits do not automatically create a new app release. A version number is not a certification of test coverage.

## Recovery

Preserve the failing state and compare it with the last validated checkpoint. Prefer a new revert or corrective commit over rewriting `main` or moving an old checkpoint. If code is restored from a checkpoint, record which commit was restored and validate it before redeploying the same Site.

Code rollback does not restore a user's browser-local draft. Treat changes to saved-data formats as compatibility changes and check them before release.
