// CONSTITUTION OF THE REPUBLIC OF CODEX — Typesetting template
// Aurelius the Chronicler, 15 April 2026

// ============ COLORS ============
#let ink = rgb("#2C2417")
#let ink-muted = rgb("#6B5E50")
#let accent = rgb("#8B7355")
#let accent-light = rgb("#B09A7E")
#let rule-color = rgb("#E0D6CA")
#let bg-cream = rgb("#FAF6F1")
#let bg-card = rgb("#F5EFE6")
#let success = rgb("#4A7C59")
#let warning = rgb("#C4883A")
#let error = rgb("#B84C4C")
#let subtle = rgb("#F0EBE3")

// ============ DOCUMENT SETUP ============
#let constitution-doc(
  title: "Constitution of the Republic of Codex",
  subtitle: "Version 1.0",
  author: "Rishabh Jain, Sovereign · Aurelius, Chronicler",
  date: "15 April 2026",
  body
) = {
  set document(title: title, author: author)
  set page(
    paper: "a4",
    margin: (left: 22mm, right: 22mm, top: 28mm, bottom: 22mm),
    header: context {
      let page-num = counter(page).get().first()
      if page-num > 3 {
        let headings = query(selector(heading.where(level: 1)).before(here()))
        let current-book = if headings.len() > 0 { headings.last().body } else { [] }
        set text(size: 8pt, fill: ink-muted, font: "Libertinus Serif")
        stack(dir: ttb,
          grid(columns: (1fr, 1fr),
            align(left)[Constitution of the Republic of Codex #sym.dot.c v1.0],
            align(right)[#current-book]
          ),
          v(2pt),
          line(length: 100%, stroke: 0.3pt + rule-color)
        )
      }
    },
    footer: context {
      let page-num = counter(page).get().first()
      if page-num > 2 {
        set text(size: 8pt, fill: ink-muted, font: "DejaVu Sans")
        grid(columns: (1fr, auto, 1fr),
          align(left)[Chronicled by Aurelius],
          align(center)[#page-num],
          align(right)[Ratified 15 April 2026]
        )
      }
    },
  )
  set text(font: "Libertinus Serif", size: 10.5pt, fill: ink, lang: "en")
  set par(justify: true, leading: 0.65em, first-line-indent: 0em)
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    v(20mm)
    set text(font: "Libertinus Serif", weight: "bold", size: 24pt, fill: ink)
    block(it.body)
    v(4mm)
    line(length: 60mm, stroke: 1.2pt + accent)
    v(6mm)
  }
  show heading.where(level: 2): it => {
    set text(font: "Libertinus Serif", weight: "bold", size: 15pt, fill: accent)
    block(spacing: 0pt, above: 14pt, below: 8pt, it.body)
  }
  show heading.where(level: 3): it => {
    set text(font: "DejaVu Sans", weight: "bold", size: 11pt, fill: ink)
    block(spacing: 0pt, above: 12pt, below: 6pt, it.body)
  }
  show heading.where(level: 4): it => {
    set text(font: "DejaVu Sans", weight: "bold", size: 10pt, fill: ink-muted)
    block(spacing: 0pt, above: 10pt, below: 4pt, it.body)
  }
  show raw: it => {
    set text(font: "DejaVu Sans Mono", size: 9pt)
    it
  }
  show raw.where(block: true): it => {
    block(fill: subtle, inset: 8pt, radius: 3pt, width: 100%, {
      set text(font: "DejaVu Sans Mono", size: 8.5pt, fill: ink)
      it
    })
  }
  body
}

// ============ SPECIAL BLOCKS ============
#let ratified(date: "15 April 2026") = {
  block(fill: rgb("#EEF4EE"), inset: 10pt, radius: 4pt, width: 100%, {
    set text(font: "Libertinus Serif", style: "italic", weight: "bold", size: 11pt, fill: success)
    align(center)[RATIFIED #sym.dot.c #date]
  })
}

#let open-status() = {
  block(fill: rgb("#FBF3E8"), inset: 10pt, radius: 4pt, width: 100%, {
    set text(font: "Libertinus Serif", style: "italic", weight: "bold", size: 11pt, fill: warning)
    align(center)[OPEN FOR CONTINUATION]
  })
}

#let pillar(numeral, title, body) = {
  block(
    fill: bg-card, inset: 12pt, radius: 4pt, width: 100%,
    above: 8pt, below: 10pt,
    stack(dir: ttb, spacing: 6pt,
      text(font: "Libertinus Serif", weight: "bold", size: 11pt, fill: accent)[Pillar #numeral #sym.dot.c #title],
      text(font: "Libertinus Serif", style: "italic", size: 10.5pt, fill: ink, body)
    )
  )
}

#let canon-block(body) = {
  block(fill: bg-card, inset: 10pt, radius: 3pt, width: 100%,
    above: 6pt, below: 8pt,
    text(font: "Libertinus Serif", size: 10.5pt, fill: ink, body)
  )
}

#let edict(numeral, title, body) = {
  block(
    stroke: (left: 2pt + accent),
    inset: (left: 12pt, rest: 8pt),
    above: 10pt, below: 10pt, width: 100%,
    stack(dir: ttb, spacing: 5pt,
      text(font: "Libertinus Serif", weight: "bold", size: 11.5pt, fill: ink)[Edict #numeral #sym.dot.c #title],
      text(font: "Libertinus Serif", size: 10.5pt, fill: ink, body)
    )
  )
}

#let quote-block(body, source: none) = {
  block(
    stroke: (left: 1pt + accent-light),
    inset: (left: 14pt, rest: 4pt),
    above: 8pt, below: 10pt, width: 100%,
    stack(dir: ttb, spacing: 4pt,
      text(font: "Libertinus Serif", style: "italic", size: 10.5pt, fill: ink-muted, body),
      if source != none {
        text(font: "DejaVu Sans", size: 8.5pt, fill: ink-muted)[— #source]
      }
    )
  )
}

#let article(num, title) = {
  heading(level: 2, numbering: none)[Article #num #sym.dot.c #title]
}

#let book-intro(body) = {
  block(
    fill: subtle, inset: 10pt, radius: 3pt, width: 100%,
    above: 4pt, below: 12pt,
    text(font: "Libertinus Serif", style: "italic", size: 10pt, fill: ink-muted, body)
  )
}

// ============ FIGURE HELPERS ============
#let caption-style(body) = {
  align(center, text(font: "DejaVu Sans", style: "italic", size: 9pt, fill: ink-muted, body))
}

#let fig-frame(body, caption: none) = {
  block(
    fill: rgb("#FCFAF7"),
    stroke: 0.5pt + rule-color,
    inset: 14pt, radius: 3pt, width: 100%,
    above: 10pt, below: 6pt,
    stack(dir: ttb, spacing: 8pt,
      align(center, body),
      if caption != none { caption-style(caption) }
    )
  )
}
