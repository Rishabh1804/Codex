// canon-cc-022 draft v0.1 — shared style preamble
// Authored by Aurelius (The Chronicler), 2026-04-19

#let setup-page() = {
  set page(
    paper: "a4",
    margin: (x: 2cm, y: 2.5cm),
    header: context {
      if counter(page).get().first() > 1 {
        set text(9pt, fill: rgb("#8a8a8a"))
        [Canon cc-022 · Persona-to-Primitive Binding · Draft v0.1]
        h(1fr)
        counter(page).display()
      }
    },
  )
  set text(font: "DejaVu Sans", size: 12pt, hyphenate: false)
  set par(justify: true, leading: 0.65em, spacing: 0.75em, first-line-indent: 0pt)
}

// Color palette — matches Codex design tokens (warm cream + burnt umber)
#let warm = rgb("#8b7355")
#let warm-dark = rgb("#5a3f20")
#let cream = rgb("#fff8e8")
#let gold = rgb("#c49a5c")
#let soft = rgb("#f5f1e8")
#let muted = rgb("#8a8a8a")
#let border = rgb("#d0c8b8")

// Primitive color tags
#let subagent-color = rgb("#2c5f8d")
#let skill-color = rgb("#5a8d2c")
#let none-color = rgb("#8a8a8a")

#let subagent-tag = box(fill: subagent-color, outset: (x: 4pt, y: 2pt), radius: 3pt,
  text(fill: white, weight: "bold", size: 10pt)[subagent])

#let skill-tag = box(fill: skill-color, outset: (x: 4pt, y: 2pt), radius: 3pt,
  text(fill: white, weight: "bold", size: 10pt)[skill])

#let none-tag = box(fill: none-color, outset: (x: 4pt, y: 2pt), radius: 3pt,
  text(fill: white, weight: "bold", size: 10pt)[none])

// Heading styles
#let setup-headings() = {
  set heading(numbering: none)
  show heading.where(level: 1): it => {
    v(0.5em)
    block(
      fill: warm,
      inset: 10pt,
      width: 100%,
      radius: 3pt,
      text(20pt, weight: "bold", fill: white, it.body)
    )
    v(0.5em)
  }
  show heading.where(level: 2): it => {
    v(0.8em)
    block(
      stroke: (bottom: 1.5pt + warm),
      inset: (bottom: 4pt),
      width: 100%,
      text(16pt, weight: "bold", fill: warm-dark, it.body)
    )
    v(0.4em)
  }
  show heading.where(level: 3): it => {
    v(0.5em)
    text(14pt, weight: "bold", fill: warm-dark, it.body)
    v(0.3em)
  }
}

// Callout boxes
#let rulebox(title: none, body) = {
  rect(
    fill: cream,
    stroke: (left: 4pt + gold),
    inset: 12pt,
    width: 100%,
    radius: 3pt,
    {
      if title != none {
        text(13pt, weight: "bold", fill: rgb("#8b6914"), title)
        linebreak()
        v(0.3em)
      }
      body
    }
  )
}

#let notebox(title: none, body) = {
  rect(
    fill: soft,
    stroke: (left: 3pt + muted),
    inset: 10pt,
    width: 100%,
    radius: 3pt,
    {
      if title != none {
        text(11pt, weight: "bold", fill: muted, title)
        linebreak()
        v(0.2em)
      }
      body
    }
  )
}

// Emphasis helpers
#let key(body) = text(fill: warm-dark, weight: "bold", body)
#let rung(body) = text(fill: warm-dark, weight: "bold", size: 13pt, body)

// Mode-row cell builder
#let mode-cell(body) = text(size: 10.5pt, body)

// Role table — 5 columns (Mode | Trigger | Produces | Binding | Rationale)
#let role-table(..rows) = {
  let row-args = rows.pos()
  table(
    columns: (1.2fr, 1.8fr, 1.8fr, 0.8fr, 2.5fr),
    stroke: 0.5pt + border,
    fill: (col, row) => if row == 0 { soft } else { white },
    align: (col, row) => if row == 0 { center + horizon } else { left + top },
    table.header(
      text(weight: "bold", size: 11pt)[Mode],
      text(weight: "bold", size: 11pt)[Trigger],
      text(weight: "bold", size: 11pt)[Produces],
      text(weight: "bold", size: 11pt)[Binding],
      text(weight: "bold", size: 11pt)[Rationale],
    ),
    ..row-args,
  )
}

// Metadata table (2-col)
#let meta-table(..rows) = {
  table(
    columns: (1fr, 3fr),
    stroke: (x, y) => (
      top: if y == 0 { 1pt + border } else { 0pt },
      bottom: 0.5pt + border,
      left: 0pt,
      right: 0pt,
    ),
    align: left + top,
    inset: 8pt,
    ..rows.pos()
  )
}
