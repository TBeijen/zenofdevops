---
name: yaml-driven-content
description: >
  Generate or modify Hugo layouts that render content
  from YAML data files instead of Markdown page content.
---

# YAML Driven Section

Use this skill when working on sections of the site where:

- Conceptual DevOps content lives in `/data/zen.yaml`
- Markdown files are only responsible for framing or navigation
- layout logic should derive meaning from structured data

This site uses YAML data for the main frontpage content. 
It is using data since that allows things like:
- Toggling showing of just the items tagged 'devops', or also 'python'
- Allowing to easily first present a compact list, then down on the page render all items including the description
- Allowing to easily adjust presentation, without needing to modify data

The frontpage will use this data.

Supporting pages such as 'about' will be regular Hugo pages, so based on markdown.

---

## Content Authority Rules

Agents must assume:

- YAML content is authoritative
- Markdown is contextual
- Templates must bind to `.Site.Data`
- Meaningful prose must never be copied from YAML into `.md`
- Description contents in YAML to be markdown, to be rendered with `markdownify`

Avoid:

- embedding principle text directly into layout files
- creating parallel frontmatter fields that repeat YAML values
- introducing page-level overrides for YAML-driven content
- manual duplication of YAML fields in HTML templates

---

## Hugo Data Binding Expectations

Philosophical content should be rendered via:

- `range` over `.Site.Data.<collection>`
- partials that accept structured principle objects
- layout logic that maps YAML structure to semantic HTML

Example pattern:

```go-html-template
{{ range .Site.Data.zen.items }}
  <!-- content -->
{{ end }}
```
