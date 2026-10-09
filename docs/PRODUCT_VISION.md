# Product vision

## Purpose

Help QA engineers, test engineers, and testers at every experience level learn how to test a target, understand its components and risks, and create a useful testing plan. The ambition is to guide testing across many kinds of products, especially software and hardware. Coverage should expand through concrete, reviewed examples rather than imply every domain is already supported.

## Decisions already made

| Decision | Direction |
| --- | --- |
| Audience | Individual professional testers, publicly accessible; useful to beginners through experienced practitioners. |
| Main entry point | Describe a target, then create a testing blueprint. |
| Initial useful outcome | Create and export a testing plan; develop requirements-to-test-cases behavior through iterations. |
| Example emphasis | Balanced software and hardware, with deeper attention to web and mobile. |
| Reference approach | Reliable testing foundations including ISTQB/ASTQB, plus appropriate domain-specific official guidance. |
| Beta inputs | Public, synthetic, or redacted requirements only. |
| Charging | Free beta; limited AI generation if AI is later introduced. |
| Budget | Under $30 per month including the existing ChatGPT subscription; begin with the current prototype and grow costs incrementally. |
| Development | Build and iterate here using GitHub version control. Cursor is optional. |
| Platforms | Web first; an iOS app may follow later. |

## How the experience should evolve

A visitor should learn what to test, why it matters, which technique to use, what evidence to collect, and where an expected result comes from. Guidance should adapt to the actual target and the visitor's experience. A beginner should receive explanations; an experienced tester should be able to move efficiently and refine a plan.

Plans should distinguish supplied requirements, assumptions, suggested exploratory checks, and unresolved questions. They should map tests to product components and risks. Specific acceptance limits must come from product requirements, specifications, or an authorized owner.

## Current implementation

Version 0.1.0 is a browser-based prototype with predefined category guidance, local drafts, and exports. Entering a target description names the plan; it does not yet analyze those requirements to produce unique test cases. External source links provide a reading trail; they are not retrieved passage citations.

## Candidate next iterations

These are candidates, not an agreed order or committed scope:

- Align layout, navigation, terminology, and visual style with the owner's vision.
- Improve the depth and usefulness of web, mobile, and hardware examples.
- Turn supplied requirements into traceable cases with steps, expected results, and explicit questions.
- Add a reviewed source registry with document versions, precise locations, and reuse permissions before document ingestion.
- Introduce optional AI assistance only after its quality, privacy, usage limits, and costs are defined.

Choose one concrete outcome at the start of each iteration. Update this document when the owner changes the product direction.
