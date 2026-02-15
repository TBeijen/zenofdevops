# AGENTS.md

## Purpose of This Site

This is a static site presenting:

"The Zen of DevOps"

The main philosophical content is derived from:

/data/zen.yaml

This YAML file is the canonical representation of DevOps principles,
inspired by The Zen of Python and adapted toward:

- delivery
- operability
- resilience
- observability
- repeatability
- safe change

Markdown content provides:

- framing
- narrative guidance
- navigation context

Meaning must always be derived from structured YAML data,
not duplicated or reinterpreted inside page templates.

---

## Content Model

Items in zen.yaml represent:

- enduring practices
- operational design heuristics
- architectural guidance

They are not:

- product advice
- tooling recommendations
- implementation walkthroughs
- vendor-neutral documentation

Layout and styling must support:

- reflection
- understanding
- reading flow

not:

- scanning
- dashboards
- quick comparison
- call-to-action patterns

---

## Structural Expectations

Agents must:

- treat YAML content as canonical
- render principles via Hugo data binding
- avoid duplicating YAML meaning into Markdown
- prefer semantic HTML
- keep philosophical content server-rendered

Principles with:

devops: true

must always be:

- visible
- readable
- navigable

without JavaScript.

---

## Visual Design Intent

The site communicates enduring engineering practice,
not current tooling trends.

Design should:

- emphasize calmness and focus
- prefer whitespace over borders
- prefer typography over ornamentation
- communicate structure through layout
- support uninterrupted reading

Avoid:

- dashboard aesthetics
- card-grid metaphors
- marketing hero sections
- SaaS-style gradients
- visual noise
- motion as decoration
- gamified interaction patterns

Interaction must not become:

- required for comprehension
- required for navigation
- required to access YAML-derived meaning

---

## Styling Constraints

All styling must:

- use plain CSS
- assume modern evergreen browsers
- support progressive enhancement

No:

- Tailwind
- UnoCSS
- Bootstrap
- CSS-in-JS
- utility-first frameworks

Modern CSS features may be used:

- gradients
- blur
- container queries
- custom properties
- prefers-color-scheme
- logical properties
- clamp()

All required assets must be self-hosted.

No external:

- fonts
- images
- icon sets
- CSS frameworks
- runtime JS dependencies

---

## Progressive Enhancement Model

JavaScript is optional.

Without JS the site must still:

- render all DevOps principles
- render explanatory descriptions
- expose YAML-derived content
- provide navigation
- maintain typographic hierarchy

JavaScript may enhance:

- theme switching
- filtering
- grouping
- presentation of python-related items

Controls requiring JS must:

- be hidden by default
- appear only after JS initializes
- never gate essential content

---

## Philosophical Tone

Generated content must:

- focus on practice
- acknowledge trade-offs
- emphasize repeatability
- avoid absolutist claims
- avoid trend-driven language
- avoid vendor framing

Prefer:

- systems thinking
- operational clarity
- time-based consequences
- risk-aware phrasing

Avoid:

- buzzwords
- acceleration metaphors
- tooling-first explanations
- future-of-X framing

---

## Architectural Integrity

This repository uses OpenCode skills as:

- implementation contracts
- interaction boundaries
- styling guardrails

If requested changes:

- contradict existing skills
- introduce repeated exceptions
- evolve interaction beyond enhancement
- rely on JS for comprehension
- bypass YAML authority

Agents should:

- note the divergence
- suggest updating affected skills
- propose architectural clarification

Avoid silent constraint erosion.
