#!/usr/bin/env python3
"""Build the Constitution reader from the Typst source.

    python3 constitution/reader/build.py

Compiles constitution/main.typ with Typst's HTML target (the template's
html-mode branch emits classed, semantic elements), then gives the result
its reading structure: one <section> per Book, one <article> per Article or
Edict, stable citation ids and a contents rail. Writes
constitution/reader/index.html with reader.css and reader.js inlined.

The PDF is not touched. Rebuild whenever a .typ file under constitution/
changes, and commit the generated index.html with the source change.
"""

import re
import subprocess
import sys
import tempfile
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent  # constitution/
OUT = HERE / "index.html"

ROMAN = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7, "VIII": 8, "IX": 9}


def compile_html() -> str:
    with tempfile.TemporaryDirectory() as tmp:
        out = Path(tmp) / "raw.html"
        cmd = ["typst", "compile", "--features", "html", "--input", "target=html",
               "--format", "html", str(ROOT / "main.typ"), str(out)]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            sys.stderr.write(res.stderr)
            sys.exit("typst compile failed")
        # Only surface warnings other than the expected print-only ones.
        noise = ("v was ignored", "pagebreak was ignored", "page set rule was ignored",
                 "html export is under active development")
        for block in res.stderr.split("\n\n"):
            if block.startswith("warning") and not any(n in block for n in noise):
                sys.stderr.write(block + "\n\n")
        return out.read_text(encoding="utf-8")


def slug(text: str) -> str:
    text = text.lower().replace("’", "").replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def text_of(el) -> str:
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True))


def classify(title: str):
    """Return (kind, id, numeral, short title) for an <h2> title."""
    m = re.match(r"Book ([IVX]+) — (.+)", title)
    if m:
        return "book", f"book-{ROMAN[m.group(1)]}", m.group(1), m.group(2)
    m = re.match(r"Appendix ([A-Z]) — (.+)", title)
    if m:
        return "appendix", f"appendix-{m.group(1).lower()}", m.group(1), m.group(2)
    return "front", slug(title), None, title


def build():
    raw = BeautifulSoup(compile_html(), "lxml")
    body = raw.body
    doc = BeautifulSoup("", "lxml")

    nodes = [n for n in body.children if not (isinstance(n, NavigableString) and not n.strip())]

    # --- Front: the cover and the declaration are the first two colophons.
    cover, declaration = nodes[0], nodes[1]
    assert "colophon" in cover.get("class", []) and "colophon" in declaration.get("class", [])
    cover_lines = [text_of(p) for p in cover.find_all("p")]
    convention = cover.find_all("p")[-1]
    nodes = nodes[2:]

    sections = []   # {kind,id,numeral,title,status,nodes,children}
    for n in nodes:
        if n.name == "h2":
            kind, sid, numeral, title = classify(text_of(n))
            sections.append(dict(kind=kind, id=sid, numeral=numeral, title=title,
                                 full=text_of(n), status=None, nodes=[]))
        else:
            sections[-1]["nodes"].append(n)

    # The print Table of Contents is replaced by the contents rail.
    sections = [s for s in sections if s["id"] != "table-of-contents"]

    main = doc.new_tag("main", id="text")

    for s in sections:
        sec = doc.new_tag("section", attrs={"class": f"part part-{s['kind']}", "id": s["id"],
                                            "aria-labelledby": s["id"] + "-h"})
        head = doc.new_tag("header", attrs={"class": "part-head"})
        h2 = doc.new_tag("h2", id=s["id"] + "-h")
        if s["numeral"]:
            label = "Book" if s["kind"] == "book" else "Appendix"
            num = doc.new_tag("span", attrs={"class": "part-num"})
            num.string = s["numeral"]
            num["aria-label"] = f"{label} {s['numeral']}"
            h2.append(num)
            word = doc.new_tag("span", attrs={"class": "part-word"})
            word.string = label
            h2.append(word)
        t = doc.new_tag("span", attrs={"class": "part-title"})
        t.string = s["title"]
        h2.append(t)
        head.append(h2)
        sec.append(head)
        s["children"] = []

        current = sec       # where loose nodes go
        current_id = s["id"]
        intro_done = False
        for n in s["nodes"]:
            cls = n.get("class", []) if hasattr(n, "get") else []
            if n.name == "p" and "status" in cls:
                s["status"] = text_of(n)
                n["class"] = cls + ["part-status"]
                head.append(n)
                continue
            if n.name == "div" and "book-intro" in cls and not intro_done:
                intro_done = True
                head.append(n)
                continue

            is_article = n.name == "h3" and "article" in cls
            is_edict = n.name == "section" and "edict" in cls
            if is_article or is_edict:
                if is_article:
                    num, title = n["data-num"], text_of(n)
                    aid = f"b{ROMAN.get(s['numeral'], 0)}-art-{num.lower()}" if s["kind"] == "book" \
                        else f"{s['id']}-art-{num.lower()}"
                    note_main, note_sub = "Art.", num
                    cite = f"Book {s['numeral']}, Article {num}"
                else:
                    num = n["data-numeral"]
                    title_el = n.find(class_="edict-title")
                    title_el.find(class_="edict-num").decompose()
                    title = text_of(title_el)
                    aid = f"edict-{num.lower()}"
                    note_main, note_sub = "Edict", num
                    cite = f"Edict {num}"

                art = doc.new_tag("article", attrs={"class": "provision", "id": aid,
                                                    "aria-labelledby": aid + "-h"})
                note = doc.new_tag("a", attrs={"class": "sidenote", "href": "#" + aid,
                                               "data-cite": f"{cite} — {title}"})
                note["aria-label"] = f"Copy link to {cite}"
                a1 = doc.new_tag("span", attrs={"class": "sn-kind"}); a1.string = note_main
                a2 = doc.new_tag("span", attrs={"class": "sn-num"}); a2.string = note_sub
                a3 = doc.new_tag("span", attrs={"class": "sn-act", "aria-hidden": "true"}); a3.string = "Copy link"
                note.extend([a1, a2, a3])
                art.append(note)

                h3 = doc.new_tag("h3", id=aid + "-h", attrs={"class": "provision-title"})
                h3.string = title
                art.append(h3)
                if is_edict:
                    for c in list(n.find(class_="edict-body").children):
                        art.append(c.extract() if hasattr(c, "extract") else c)
                    art["class"] = "provision provision-edict"
                sec.append(art)
                current, current_id = art, aid
                s["children"].append(dict(id=aid, num=note_sub, kind=note_main, title=title))
                continue

            # Sub-headings inside an Article: demote h5 → h4, give them ids.
            if n.name == "h5":
                n.name = "h4"
                n["class"] = ["subhead"]
                n["id"] = f"{current_id}--{slug(text_of(n))}"
            # Plates: let CSS size the SVG; describe it by its caption.
            if n.name == "figure" and "plate" in cls:
                svg = n.find("svg")
                cap = n.find("figcaption")
                for attr in ("style", "width", "height"):
                    svg.attrs.pop(attr, None)
                svg["role"] = "img"
                if cap:
                    svg["aria-label"] = text_of(cap)
            # Wide tables scroll inside themselves, never the page.
            if n.name == "table":
                wrap = doc.new_tag("div", attrs={"class": "table-wrap", "tabindex": "0",
                                                 "role": "region", "aria-label": "Table"})
                wrap.append(n)
                n = wrap
            current.append(n)
        main.append(sec)

    # --- Contents rail
    nav = doc.new_tag("ol", attrs={"class": "toc"})
    for s in sections:
        li = doc.new_tag("li", attrs={"class": f"toc-part toc-{s['kind']}"})
        a = doc.new_tag("a", href="#" + s["id"], attrs={"class": "toc-part-link"})
        if s["numeral"]:
            num = doc.new_tag("span", attrs={"class": "toc-num"}); num.string = s["numeral"]
            a.append(num)
        tt = doc.new_tag("span", attrs={"class": "toc-title"}); tt.string = s["title"]
        a.append(tt)
        li.append(a)
        if s["children"]:
            sub = doc.new_tag("ol", attrs={"class": "toc-arts"})
            for c in s["children"]:
                cli = doc.new_tag("li")
                ca = doc.new_tag("a", href="#" + c["id"])
                cn = doc.new_tag("span", attrs={"class": "toc-art-num"}); cn.string = c["num"]
                ct = doc.new_tag("span", attrs={"class": "toc-art-title"}); ct.string = c["title"]
                ca.extend([cn, ct])
                cli.append(ca)
                sub.append(cli)
            li.append(sub)
        nav.append(li)

    # --- Assemble
    version = next((l for l in cover_lines if l.startswith("Version")), "")
    dates = next((l for l in cover_lines if "Ratified" in l and "Amended" in l), "")
    decl = declaration.find_all("p")

    tpl = (HERE / "shell.html").read_text(encoding="utf-8")
    page = (tpl
            .replace("{{CSS}}", (HERE / "reader.css").read_text(encoding="utf-8"))
            .replace("{{JS}}", (HERE / "reader.js").read_text(encoding="utf-8"))
            .replace("{{VERSION}}", version)
            .replace("{{DATES}}", dates.replace(" · ", "; "))
            .replace("{{ORDAIN}}", decl[0].decode_contents())
            .replace("{{MAXIMS}}", decl[1].decode_contents())
            .replace("{{CONVENTION}}", convention.decode_contents())
            .replace("{{TOC}}", str(nav))
            .replace("{{TEXT}}", str(main)))
    OUT.write_text(page, encoding="utf-8")
    n_art = sum(len(s["children"]) for s in sections)
    print(f"wrote {OUT.relative_to(ROOT.parent)} — {len(sections)} parts, {n_art} provisions, "
          f"{len(page)//1024} KB")


if __name__ == "__main__":
    build()
