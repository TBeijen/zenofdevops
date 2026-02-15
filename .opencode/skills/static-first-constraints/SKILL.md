---
name: static-first-constraints
description: >
  Enforce static-first architecture and self-hosted, CSS-only design
  for Hugo layouts with progressive JS enhancement.
---

# Static First Constraints

Use this skill when:

- creating or modifying layouts
- introducing styling
- adding interaction
- proposing design changes
- generating HTML structure
- introducing JavaScript behavior

This site is designed as a static-first system.

Essential philosophical content must render and function without:

- JavaScript
- external libraries
- third-party assets
- client-side frameworks

---

## Hosting Boundaries

All required assets must be self-hosted from the site's own domain.

Do not introduce:

- external fonts (e.g. Google Fonts)
- CDN-hosted CSS or JS
- externally hosted SVGs or images
- icon libraries
- runtime script dependencies
- analytics SDKs
- design system packages

Agents may assume:

- locally hosted fonts
- locally stored images
- local JS modules
- Hugo Pipes for asset processing

---

## Styling Model

Use:

- plain CSS
- modern browser capabilities
- semantic HTML structure
- progressive enhancement

Do not introduce:

- Tailwind
- UnoCSS
- Bootstrap
- CSS-in-JS
- PostCSS utility frameworks
- runtime style injection
- class-generation tooling

Modern CSS features are allowed, including:

- gradients
- backdrop-filter
- blur effects
- container queries
- clamp()
- prefers-color-scheme
- logical properties
- custom properties

Agents may assume evergreen browser support.

---

## Functional Requirements Without JS

Without JavaScript the site must still:

- display all DevOps principles
- display explanatory content
- provide readable navigation
- maintain typographic hierarchy
- expose YAML-derived philosophical content

Core meaning must not depend on:

- client-side rendering
- DOM mutation
- event listeners
- hydration
- data fetching

---

## Progressive Enhancement Model

JavaScript may be used only for:

- optional interaction
- display preferences
- alternative views
- content filtering
- dynamic presentation of YAML-derived elements

Examples include:

- light/dark mode switching
- principle grouping toggles
- expanded examples
- python-specific item display

---

## Visibility Contract

Controls that require JavaScript must:

- not appear when JS is unavailable
- be hidden by default
- become visible only after JS initializes

Implement via:

- `.js-enabled` class on `<html>`
- or equivalent capability flag

Pattern:

Initial HTML:

```html
<html>
```
On JS load:

```
document.documentElement.classList.add('js-enabled');
```

Control visibility:

```
.js-only {
  display: none;
}

.js-enabled .js-only {
  display: block;
}
```

Agents must not create UI controls that fail silently when JS is disabled.

---

## Architectural Priority

Prefer:

- server-rendered structure
- semantic fallbacks
- CSS-based interaction where possible

Avoid:

- JS-first interaction patterns
- hidden essential content
- interaction as navigation