# AGENTS.md

## Project Overview

Hugo static site presenting "The Zen of DevOps" — DevOps principles
inspired by The Zen of Python (PEP 20). No Hugo theme; all layouts are
hand-rolled. Hosted on Cloudflare Pages.

`data/zen.yaml` is the **canonical content source**. Markdown provides
framing and narrative context only. Never duplicate or reinterpret YAML
meaning inside templates or Markdown files.

---

## Build & Dev Commands

```sh
hugo server        # Dev server with livereload (http://localhost:1313)
hugo               # Production build → public/
```

- Hugo version: v0.155.3+extended (installed via Homebrew)
- Hugo Pipes handles CSS minification — no external build pipeline
- No package.json, Makefile, or scripts at the project root
- No test framework, linter, or formatter is configured
- No CI/CD pipeline exists

---

## Project Structure

```
├── hugo.toml                    # Minimal config (disables taxonomies)
├── data/
│   └── zen.yaml                 # Canonical content (22 items)
├── assets/
│   └── css/main.css             # Single CSS file, processed by Hugo Pipes
├── content/
│   └── about.md                 # Only non-home content page
├── layouts/
│   ├── _default/
│   │   ├── baseof.html          # Base template (HTML shell, CSS/JS loading)
│   │   └── single.html          # Generic content pages (about)
│   └── index.html               # Homepage (two-pass zen item rendering)
├── static/                      # Favicons and static assets
├── source/                      # Source files (icon.drawio)
├── reference/                   # Reference material (not part of build)
└── .opencode/skills/            # OpenCode skill contracts
```

---

## Data Schema — zen.yaml

```yaml
meta:
  title: "The Zen of DevOps"     # Used as site <title>
items:
  - id: slug-string              # Unique ID, used as URL anchor
    title: "Principle statement"  # Display title
    python: true                  # true if from Zen of Python
    devops: true                  # true if part of Zen of DevOps
    description: |                # Markdown body (empty string if devops: false)
      Explanation of the principle.
```

- Items with `devops: true` are rendered on the site (16 of 22)
- Items with `devops: false` are hidden (Python-only, not applicable)
- Templates access data via `.Site.Data.zen.meta` and `.Site.Data.zen.items`
- Description fields are rendered with `{{ .description | markdownify }}`

---

## Template Conventions

Three layout files total. No partials. No shortcodes.

- **baseof.html** — HTML5 shell. Title from `.Site.Data.zen.meta.title`.
  CSS via Hugo Pipes: `resources.Get "css/main.css" | resources.Minify`.
  Conditional JS: `{{ with resources.Get "js/theme.js" }}` (file does not yet exist).
- **index.html** — Two rendering passes over `.Site.Data.zen.items`:
  1. Compact `<ol>` of anchor links (filtered by `{{ if .devops }}`)
  2. Detailed `<section>` elements with `id="{{ .id }}"`, title, badges, description
- **single.html** — Simple `<h1>` + `{{ .Content }}` for content pages.

Conventions:
- Use semantic HTML: `<main>`, `<header>`, `<section>`, `<ol>`
- Filter items with `{{ if .devops }}` — never hardcode item lists
- Bind to `.Site.Data` — never duplicate YAML content into templates

---

## CSS Conventions

Single file: `assets/css/main.css`, minified by Hugo Pipes.

- **Section comments**: `/* --- Section Name --- */`
- **Custom properties** in `:root` for all colors and typography values
- **Color palette**: dark-first (`--bg: #0c161d`, `--fg: #e6eef4`),
  with `--heading`, `--link`, `--link-hover`, `--fg-muted`, `--border`
- **No light mode yet** — `prefers-color-scheme` support is planned
- **Layout**: `max-width: 48rem`, centered with `margin: 0 auto`
- **Target semantic elements** directly — minimize class usage
- **Badge classes**: `.badge`, `.badge.python`, `.badge.devops`
- **No CSS classes for layout** — structure conveyed through HTML elements

When adding CSS:
- Add to the appropriate section (Base, Layout, Headings, Text, etc.)
- Define new colors as custom properties in `:root`
- Prefer element/attribute selectors over class selectors where possible

---

## Styling & Asset Constraints

All styling must use **plain CSS**. No frameworks:
- No Tailwind, UnoCSS, Bootstrap, CSS-in-JS, or utility-first CSS

All assets must be **self-hosted**. No external:
- Fonts, images, icon sets, CSS frameworks, or runtime JS dependencies

Modern CSS features are encouraged:
- Custom properties, `clamp()`, container queries, logical properties,
  `prefers-color-scheme`, gradients, blur

---

## Progressive Enhancement

JavaScript is **optional**. Without JS the site must:
- Render all DevOps principles with descriptions
- Provide navigation and maintain typographic hierarchy

JS may enhance: theme switching, filtering, grouping.

Controls requiring JS must:
- Be hidden by default via CSS
- Appear only after JS adds a `.js-enabled` class
- Never gate access to YAML-derived content

---

## Design & Tone

Design should emphasize **calmness and focus**:
- Prefer whitespace over borders, typography over ornamentation
- Communicate structure through layout, support uninterrupted reading
- Consider monospaced fonts for zen items (tech-field emphasis)

Avoid: dashboard aesthetics, card grids, marketing hero sections,
SaaS-style gradients, motion as decoration, gamified interaction.

Content tone must be **practice-focused**:
- Acknowledge trade-offs, emphasize repeatability
- Prefer systems thinking, operational clarity, risk-aware phrasing
- Avoid buzzwords, acceleration metaphors, vendor framing, future-of-X

---

## Architectural Integrity

OpenCode skills in `.opencode/skills/` define implementation contracts:
- `yaml-driven-content.md` — YAML is authoritative, templates bind to data
- `static-first-constraints.md` — self-hosted assets, no CSS frameworks, JS optional
- `drift-detection.md` — agents must flag divergence from constraints

If a requested change contradicts this file or the skills:
- Note the divergence explicitly
- Suggest updating the affected skill or this file
- Do not silently erode constraints
