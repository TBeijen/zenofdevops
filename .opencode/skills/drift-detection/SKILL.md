---
name: drift-detection
description: >
  Detect divergence between requested changes, implementation, and the
  repo's AGENTS.md worldview + OpenCode skills; propose updates when drift is intentional.
---

# Drift Detection

Use this skill when:

- implementing new layouts or navigation
- introducing interaction or personalization
- adding or refactoring CSS structure
- changing how YAML content is rendered
- adding JavaScript behavior
- making repeated exceptions to constraints
- responding to requests that feel "out of character" for the site

This repository has explicit architectural intent documented in:

- /AGENTS.md (worldview + boundaries)
- .opencode/skills/* (implementation contracts)

Agents must treat these as the current source of truth.

---

## What Counts as Drift

Drift occurs when requested changes or implementation:

- contradict /AGENTS.md (purpose, tone, visual intent, constraints)
- contradict an existing skill contract
- gradually introduce new dependencies or frameworks
- shift essential behavior from static to JS-dependent
- duplicate YAML meaning into templates or Markdown
- introduce new UI metaphors that conflict with the reading-first intent
- repeatedly introduce "one-off" exceptions that become patterns

---

## Non-Drift

These are not automatically drift:

- isolated experiments behind a feature flag
- purely visual refactors that keep the same constraints
- enhancements that do not gate access to content
- temporary debug scaffolding that is removed in the same change

---

## Repeated Exception Rule

If the same type of exception happens:

- more than once, OR
- in more than one file/section, OR
- becomes part of navigation or core layout

assume it might be an intentional evolution.

---

## Required Behavior When Drift Is Detected

Agents must not silently comply.

Instead, do all of the following:

1. Continue implementing the user's request as asked
2. Identify the specific conflicting rule(s)
   - reference the relevant skill name(s) and/or AGENTS.md section title(s)
3. Briefly describe the divergence in concrete terms
4. Propose one of these options:

   A) Treat as a one-time exception (no contract change)
   B) Update an existing skill or AGENTS.md to reflect the new intent
   C) Create a new skill that captures the new pattern explicitly

Agents should provide the proposed text changes as copy/pasteable snippets.

---

## Suggested Response Template

Use a short, practical note like:

"This change conflicts with:
- AGENTS.md: 'Progressive Enhancement Model'
- skill: 'static-first-constraints' (JS must not gate essential content)

If this is intentional, we can:
A) keep it as an exception, or
B) update the contract. Suggested update: ..."

Keep the note brief; focus on actionable edits.

---

## Priorities

Prefer:

- explicit contract updates
- clear boundaries
- predictable future generations

Avoid:

- silent constraint erosion
- accumulating undocumented exceptions
- repo intent becoming unclear over time
