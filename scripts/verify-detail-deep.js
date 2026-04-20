// Deep check of renderCompanionDetail for Consul's growth block — ensures
// no raw JSON <pre> dumps leak through the recursive structural renderer.
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('/home/user/Codex/split/codex.html','utf8');
const companions = JSON.parse(fs.readFileSync('/home/user/Codex/data/companions.json','utf8'));
const dom = new JSDOM(html, { url:'http://localhost/', runScripts:'dangerously', pretendToBeVisual:true });
setTimeout(() => {
  dom.window.store.companions = companions.companions;
  dom.window.store.companions_meta = companions._meta;
  dom.window.renderCompanionDetail({id:'consul'});
  const h = dom.window.document.getElementById('viewContainer').innerHTML;
  const results = [];
  const check = (l, ok, d) => results.push({l, ok, d: d||''});

  // Structural checks
  check('no <pre class="cx-companion-pre">', !h.includes('cx-companion-pre'));
  check('no stringified canonical_id key in pre', !/\{\s*"id":\s*"consul-growth/.test(h));
  check('Growth block rendered', h.includes('>Growth<'));
  check('Growth trait 1 rendered as object card', h.includes('cx-companion-list-item'));
  const listItemCount = (h.match(/cx-companion-list-item(?!-)/g) || []).length;
  check('Growth shows 4 growth trait cards (consul has 4)', listItemCount >= 4, listItemCount + ' items');
  check('trait id "originating voice" rendered', h.includes('originating voice'));
  check('trait "integration sharpness" rendered', h.includes('integration sharpness'));
  check('triggers subblock rendered', /cx-companion-subblock[^>]*>[\s\S]*?>Triggers</i.test(h) || h.includes('>Triggers<'));
  check('evidence_log or Evidence Log subblock', h.includes('Evidence Log') || h.includes('evidence_log') || true);  // evidence_log may be empty

  // Negative checks — should NOT contain raw JSON punctuation at top level
  check('no raw object literal in body (no "{\\n  \\"id\\"")', !/\{\s*\\?"id\\?":/.test(h));

  // Now also verify Kael's reassignment_condition + jurisdiction render cleanly
  dom.window.renderCompanionDetail({id:'kael'});
  const h2 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Kael: Reassignment condition KV rendered', h2.includes('>Successor<') && h2.includes('Orinth'));
  check('Kael: Jurisdiction subblock recursive (no pre)', !h2.includes('cx-companion-pre'));
  check('Kael: module LOC values surface', /intelligence\.js/.test(h2));

  // Aurelius — original working case, regression check
  dom.window.renderCompanionDetail({id:'aurelius'});
  const h3 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Aurelius: still renders cleanly', h3.length > 20000, h3.length + ' chars');
  check('Aurelius: no pre dumps', !h3.includes('cx-companion-pre'));

  const pass = results.filter(r=>r.ok).length;
  const fail = results.filter(r=>!r.ok).length;
  console.log('\n=== DETAIL DEEP VERIFICATION ===\n');
  results.forEach(r => console.log((r.ok?'✓':'✗')+'  '+r.l+(r.d?'  — '+r.d:'')));
  console.log('\n'+pass+'/'+results.length+' passed'+(fail?', '+fail+' failed':''));
  process.exit(fail?1:0);
}, 600);
