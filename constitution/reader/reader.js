/* Constitution reader — theme, contents rail, citation side-notes, search. */
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;

  /* ---------- Theme ---------- */
  var themeBtn = document.getElementById('theme');
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); }
    catch (e) { return null; }
  }
  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function paintThemeBtn() {
    var dark = effectiveTheme() === 'dark';
    themeBtn.textContent = dark ? 'Light' : 'Dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  var saved = store('codex-constitution-theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  paintThemeBtn();
  themeBtn.addEventListener('click', function () {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('codex-constitution-theme', next);
    paintThemeBtn();
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ---------- Rail (narrow screens: a drawer) ---------- */
  var openBtn = document.getElementById('open-rail');
  var rail = document.getElementById('rail');
  var find = document.getElementById('find');
  function railIsDrawer() { return !matchMedia('(min-width: 80rem)').matches; }
  function setRail(open) {
    body.classList.toggle('rail-open', open);
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    openBtn.textContent = open ? 'Close' : 'Contents';
    if (open) {
      var cur = rail.querySelector('.toc-arts a.current') || rail.querySelector('a');
      if (cur) cur.scrollIntoView({ block: 'center' });
    }
  }
  openBtn.addEventListener('click', function () { setRail(!body.classList.contains('rail-open')); });
  rail.addEventListener('click', function (e) {
    if (e.target.closest('a') && railIsDrawer()) setRail(false);
  });

  /* ---------- Citation side-notes ---------- */
  function linkTo(id) { return location.origin + location.pathname + '#' + id; }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }
  document.addEventListener('click', function (e) {
    var note = e.target.closest('.sidenote');
    if (!note) return;
    e.preventDefault();
    var id = note.getAttribute('href').slice(1);
    history.replaceState(null, '', '#' + id);
    var act = note.querySelector('.sn-act');
    copy(linkTo(id)).then(function () {
      note.classList.add('copied');
      act.textContent = 'Link copied';
      say('Link to ' + note.getAttribute('data-cite') + ' copied');
      setTimeout(function () { note.classList.remove('copied'); act.textContent = 'Copy link'; }, 1800);
    }, function () {
      say('Copy failed. The address bar now links to ' + note.getAttribute('data-cite') + '.');
    });
  });

  /* ---------- Where am I: mark the current provision in the rail ---------- */
  var tocLinks = {};
  rail.querySelectorAll('.toc a').forEach(function (a) { tocLinks[a.getAttribute('href').slice(1)] = a; });
  var parts = Array.prototype.slice.call(document.querySelectorAll('.part'));
  var provisions = Array.prototype.slice.call(document.querySelectorAll('.provision'));
  var currentEls = [];

  function mark(partId, provId) {
    currentEls.forEach(function (el) { el.classList.remove('current'); el.removeAttribute('aria-current'); });
    currentEls = [];
    rail.querySelectorAll('.toc-part.open').forEach(function (li) {
      if (!li.classList.contains('pinned')) li.classList.remove('open');
    });
    var pl = tocLinks[partId];
    if (pl) {
      pl.classList.add('current'); currentEls.push(pl);
      pl.parentNode.classList.add('open');
    }
    var al = provId && tocLinks[provId];
    if (al) { al.classList.add('current'); al.setAttribute('aria-current', 'location'); currentEls.push(al); }
  }

  var ticking = false;
  function locate() {
    ticking = false;
    var line = window.innerHeight * 0.3;
    var part = null, prov = null;
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].getBoundingClientRect().top <= line) part = parts[i]; else break;
    }
    if (part) {
      var ps = part.querySelectorAll('.provision');
      for (var j = 0; j < ps.length; j++) {
        if (ps[j].getBoundingClientRect().top <= line) prov = ps[j]; else break;
      }
    }
    mark(part ? part.id : null, prov ? prov.id : null);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(locate); }
  }, { passive: true });
  locate();
  window.addEventListener('hashchange', locate);
  window.addEventListener('load', function () { setTimeout(locate, 50); });

  /* ---------- Search ---------- */
  /* The index is read from the page itself: one entry per part (its own
     prose, outside any Article) and one per provision. */
  function clean(t) { return t.replace(/\s+/g, ' ').trim(); }
  var index = [];
  parts.forEach(function (part) {
    var full = clean(part.querySelector('h2').textContent.replace(/^([IVX]+|[A-D])(Book|Appendix)/, '$2 $1 — '));
    var title = clean(part.querySelector('.part-title').textContent);
    var own = '';
    Array.prototype.forEach.call(part.children, function (c) {
      if (!c.classList.contains('provision') && !c.classList.contains('part-head')) own += ' ' + c.textContent;
    });
    index.push({ id: part.id, cite: full, part: full, title: title, text: clean(own) });
    part.querySelectorAll('.provision').forEach(function (pr) {
      var note = pr.querySelector('.sidenote');
      var cite = note.getAttribute('data-cite').split(' — ')[0];
      var body = '';
      Array.prototype.forEach.call(pr.children, function (c) {
        if (c !== note && !c.classList.contains('provision-title')) body += ' ' + c.textContent;
      });
      index.push({ id: pr.id, cite: cite, part: full, title: clean(pr.querySelector('.provision-title').textContent), text: clean(body) });
    });
  });
  var toc = rail.querySelector('.toc-wrap');
  var results = document.getElementById('results');

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function highlight(s, q) {
    var i = s.toLowerCase().indexOf(q);
    if (i < 0) return esc(s);
    return esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + q.length)) + '</mark>' + esc(s.slice(i + q.length));
  }
  function snippet(text, q) {
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 140) + (text.length > 140 ? '…' : '');
    var start = Math.max(0, i - 60);
    var s = (start > 0 ? '…' : '') + text.slice(start, i + q.length + 90);
    return s + (i + q.length + 90 < text.length ? '…' : '');
  }

  function search(raw) {
    var q = raw.trim().toLowerCase();
    if (!q) { results.hidden = true; toc.hidden = false; return; }
    var hits = [];
    index.forEach(function (it) {
      var cite = it.cite.toLowerCase(), title = it.title.toLowerCase(), text = it.text.toLowerCase();
      var score = 0;
      if (cite.indexOf(q) >= 0 || (cite.split(', ')[1] || '').indexOf(q) >= 0) score += 6;
      if (title.indexOf(q) >= 0) score += 4;
      var n = 0, at = text.indexOf(q);
      while (at >= 0 && n < 20) { n++; at = text.indexOf(q, at + q.length); }
      score += Math.min(n, 5);
      if (score) hits.push({ it: it, score: score, n: n });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    var shown = hits.slice(0, 40);
    var html = '<p class="results-count">' + (hits.length
      ? hits.length + (hits.length === 1 ? ' provision mentions ' : ' provisions mention ') + '“' + esc(raw.trim()) + '”'
      : '') + '</p>';
    if (!hits.length) {
      html = '<p class="results-empty">Nothing in the Constitution matches “' + esc(raw.trim()) +
        '”. Try a single word, or an Article number such as 4-bis.</p>';
    } else {
      html += '<ol>' + shown.map(function (h) {
        var it = h.it;
        var cite = it.cite === it.part ? '' : it.cite;
        return '<li class="result"><a href="#' + it.id + '">' +
          (cite ? '<span class="result-cite">' + esc(cite) + '</span>' : '') +
          '<span class="result-title">' + highlight(it.title, q) + '</span>' +
          (h.n ? '<span class="result-snip">' + highlight(snippet(it.text, q), q) + '</span>' : '') +
          '</a></li>';
      }).join('') + '</ol>';
    }
    results.innerHTML = html;
    results.hidden = false;
    toc.hidden = true;
  }

  var debounce;
  find.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () { search(find.value); }, 80);
  });
  find.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = results.querySelector('a');
      if (first) { first.click(); location.hash = first.getAttribute('href'); }
    } else if (e.key === 'Escape') {
      find.value = ''; search('');
    }
  });
  results.addEventListener('click', function (e) {
    if (e.target.closest('a') && railIsDrawer()) setRail(false);
  });

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      if (railIsDrawer()) setRail(true);
      find.focus();
    } else if (e.key === 'Escape' && body.classList.contains('rail-open')) {
      setRail(false); openBtn.focus();
    }
  });
})();
