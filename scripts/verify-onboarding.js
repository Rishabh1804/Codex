// Onboarding surface verification for canon-proc-003 rendering on Orinth.
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('/home/user/Codex/split/codex.html','utf8');
const companions = JSON.parse(fs.readFileSync('/home/user/Codex/data/companions.json','utf8'));
const dom = new JSDOM(html, { url:'http://localhost/', runScripts:'dangerously', pretendToBeVisual:true });
setTimeout(() => {
  dom.window.store.companions = companions.companions;
  dom.window.store.companions_meta = companions._meta;

  const results = [];
  const check = (l, ok, d) => results.push({l, ok, d: d||''});

  // Orinth detail — full onboarding surface
  dom.window.renderCompanionDetail({id:'orinth'});
  const h = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Orinth: Onboarding block renders', h.includes('cx-onboarding-block'));
  check('Orinth: 7 onboarding steps render', (h.match(/cx-onboarding-step\s|cx-onboarding-step"/g) || []).length >= 7 || (h.match(/cx-onboarding-step-/g) || []).length >= 7);
  check('Orinth: appointed status chip', h.includes('cx-onboarding-status-appointed'));
  check('Orinth: progress bar renders', h.includes('cx-onboarding-progress-fill'));
  check('Orinth: step 1 complete', /cx-onboarding-step-complete[\s\S]*?Appointment declaration/.test(h) || /Appointment declaration[\s\S]*?cx-onboarding-step-chip-complete/.test(h));
  check('Orinth: step 2 in-progress', /cx-onboarding-step-in-progress[\s\S]*?Profile drafting/.test(h) || /Profile drafting[\s\S]*?cx-onboarding-step-chip-in-progress/.test(h));
  check('Orinth: canon-inst-001 artifact referenced', h.includes('canon-inst-001'));
  check('Orinth: canon-proc-003 reference rendered', h.includes('canon-proc-003'));
  check('Orinth: new assignment — Codex Builder', h.includes('Codex Builder'));
  check('Orinth: residence updated to codex', /Residence[\s\S]{0,100}Codex/.test(h));
  check('Orinth: no "Minister: Expansion" in current assignments', !/current assignments[\s\S]{0,300}Minister: Expansion/i.test(h));

  // Aurelius detail — consolidated to Chronicler, no onboarding block (operational)
  dom.window.renderCompanionDetail({id:'aurelius'});
  const h2 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Aurelius: no onboarding block', !h2.includes('cx-onboarding-block'));
  check('Aurelius: Chronicler remains in assignments', h2.includes('Chronicler of the Order'));
  check('Aurelius: Codex Builder removed from assignments', !/current assignments[\s\S]{0,400}Codex Builder/i.test(h2));
  check('Aurelius: profile version v0.5', h2.includes('v0.5'));
  check('Aurelius: biography moment for 2026-04-20 transition', /2026-04-20.*?(Codex Builder seat relinquished|consolidated to pure Chronicler)/.test(h2));

  // Kael detail — successor struck
  dom.window.renderCompanionDetail({id:'kael'});
  const h3 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Kael: Reassignment condition present', h3.includes('Reassignment condition'));
  check('Kael: Orinth no longer named as Successor', !/>Successor<[\s\S]{0,120}Orinth/.test(h3));

  // Roster: Orinth now has appointed badge, is a Builder, residency changed
  dom.window._orderSubTab = 'roster';
  dom.window.renderOrder();
  const h4 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Roster: Orinth card has appointed badge', /cx-companion-appointed-badge[\s\S]*?Orinth|Orinth[\s\S]*?cx-companion-appointed-badge/.test(h4));

  // Cabinet: Expansion now vacant
  dom.window._orderSubTab = 'cabinet';
  dom.window.renderOrder();
  const h5 = dom.window.document.getElementById('viewContainer').innerHTML;
  const vacants = (h5.match(/cx-cabinet-seat-vacant/g) || []).length;
  check('Cabinet: Expansion vacant (Debt + Expansion = 2 total)', vacants === 2, vacants + ' vacant');
  check('Cabinet: Orinth no longer on Expansion', !/Growth[\s\S]*?Expansion[\s\S]*?Orinth/.test(h5));

  // Ladder: Orinth now in Builders row
  dom.window._orderSubTab = 'ladder';
  dom.window.renderOrder();
  const h6 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Ladder: Orinth in Builders row', /Builders[\s\S]{0,1000}Orinth/.test(h6));

  // Residency: Orinth under Codex now
  dom.window._orderSubTab = 'residency';
  dom.window.renderOrder();
  const h7 = dom.window.document.getElementById('viewContainer').innerHTML;
  check('Residency: Orinth under Codex group', /Codex[\s\S]{0,1000}Orinth/.test(h7));
  check('Residency: Aurelius still under Codex group', /Codex[\s\S]{0,1000}Aurelius/.test(h7));

  const pass = results.filter(r=>r.ok).length;
  const fail = results.filter(r=>!r.ok).length;
  console.log('\n=== ONBOARDING SURFACE VERIFICATION ===\n');
  results.forEach(r => console.log((r.ok?'✓':'✗')+'  '+r.l+(r.d?'  — '+r.d:'')));
  console.log('\n'+pass+'/'+results.length+' passed'+(fail?', '+fail+' failed':''));
  process.exit(fail?1:0);
}, 600);
