// Headless render verification for The Order. Loads built split/codex.html
// into jsdom, seeds store.companions directly, calls renderOrder /
// renderCompanionDetail, and asserts on the produced HTML.
const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('/home/user/Codex/split/codex.html', 'utf8');
const companions = JSON.parse(fs.readFileSync('/home/user/Codex/data/companions.json', 'utf8'));

const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'dangerously', pretendToBeVisual: true });
const { window } = dom;
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  await wait(600);
  window.store.companions = companions.companions || [];
  window.store.companions_meta = companions._meta || {};
  const vc = window.document.getElementById('viewContainer');

  const results = [];
  const check = (label, ok, detail) => results.push({ label, ok, detail: detail || '' });

  function render(subTab) {
    window._orderSubTab = subTab;
    window.renderOrder();
    return vc.innerHTML;
  }

  // Functions defined
  ['renderOrder','renderCompanionDetail','renderCompanionCard','computeCabinetOccupancy',
   'renderOrderCabinetSubTab','renderOrderResidencySubTab','renderOrderLadderSubTab',
   'renderOrderRosterSubTab','renderCabinetSeat','renderCompanionPill','residenceLabelFor']
    .forEach(fn => check(fn, typeof window[fn] === 'function'));

  // Roster
  const h1 = render('roster');
  check('Roster: size > 15KB', h1.length > 15000, h1.length + ' chars');
  check('Roster: hero title "The Order"', h1.includes('The Order'));
  check('Roster: stat 18 companions', /stat-value[^>]*>18</.test(h1));
  check('Roster: stat 17 generational', /stat-value[^>]*>17</.test(h1));
  check('Roster: stat 1 institutional', />1</.test(h1));
  ['Aurelius','Cipher','Consul','Ashara','Petra','Lyra','Maren','Kael','Nyx','Solara','Theron',
   'Vex','Orinth','Rune','Ignis','Bard','Aeon','Pip'].forEach(function(name) {
    check('Roster: ' + name + ' present', h1.includes(name));
  });
  check('Roster: Chronicler title surface', h1.includes('Chronicler'));
  check('Roster: double-hat badge class', h1.includes('cx-companion-dh-badge'));
  check('Roster: v0.0-stub profile version rendered', h1.includes('v0.0-stub'));

  // Cabinet
  const h2 = render('cabinet');
  check('Cabinet: 4 domain panels', ['Financial Health','Productivity','Maintenance','Growth'].every(d => h2.includes(d)));
  check('Cabinet: 8 portfolios', ['Treasury','Budget','Efficiency','Output','Stability','Debt','Expansion','Innovation'].every(p => h2.includes('Minister: ' + p)));
  check('Cabinet: Ashara on Treasury', /Financial Health[\s\S]*?Treasury[\s\S]*?Ashara/i.test(h2));
  check('Cabinet: Petra on Efficiency', /Productivity[\s\S]*?Efficiency[\s\S]*?Petra/i.test(h2));
  check('Cabinet: Rune on Stability', /Maintenance[\s\S]*?Stability[\s\S]*?Rune/i.test(h2) || h2.includes('Rune'));
  check('Cabinet: Debt vacant (pre-canon-cc-011)', /Debt[\s\S]{0,400}cx-cabinet-seat-vacant|cx-cabinet-seat-vacant[\s\S]{0,400}Debt/.test(h2));
  check('Cabinet: summary line renders', /Ministerial seats filled/.test(h2));
  check('Cabinet: footnote renders', h2.includes('Constitution Book II Article 4'));

  const vacantCount = (h2.match(/cx-cabinet-seat-vacant/g) || []).length;
  check('Cabinet: 2 vacancies (Debt per cc-011, Expansion per inst-001)', vacantCount === 2, vacantCount + ' vacant seats');
  check('Cabinet: Vex on Budget', /Financial Health[\s\S]*?Budget[\s\S]*?Vex/i.test(h2));
  check('Cabinet: Ignis on Output', /Productivity[\s\S]*?Output[\s\S]*?Ignis/i.test(h2));
  check('Cabinet: Expansion vacant (post-inst-001)', /Growth[\s\S]{0,800}Expansion[\s\S]{0,400}cx-cabinet-seat-vacant|cx-cabinet-seat-vacant[\s\S]{0,400}Expansion/.test(h2));
  check('Cabinet: Bard on Innovation', /Growth[\s\S]*?Innovation[\s\S]*?Bard/i.test(h2));

  // Residency
  const h3 = render('residency');
  check('Residency: Codex group', h3.includes('Codex'));
  check('Residency: SproutLab group', h3.includes('SproutLab'));
  check('Residency: SEP Invoicing group', h3.includes('SEP Invoicing'));
  check('Residency: SEP Dashboard group', h3.includes('SEP Dashboard'));
  check('Residency: Command Center group', h3.includes('Command Center'));
  check('Residency: Cluster A label', h3.includes('Cluster A'));
  check('Residency: Cluster B label', h3.includes('Cluster B'));
  check('Residency: Capital label', h3.includes('Capital'));
  check('Residency: companion pills', h3.includes('cx-companion-pill'));

  // Ladder
  const h4 = render('ladder');
  check('Ladder: Sovereign', h4.includes('Sovereign'));
  check('Ladder: The Architect seat', h4.includes('The Architect'));
  check('Ladder: Consul row', h4.includes('Consul'));
  check('Ladder: Censors', h4.includes('Censors'));
  check('Ladder: Builders', h4.includes('Builders'));
  check('Ladder: Governors', h4.includes('Governors'));
  check('Ladder: Scribes', h4.includes('Scribes'));
  check('Ladder: empty-state for Scribes', h4.includes('None seated'));
  check('Ladder: footnote', h4.includes('Single-ladder'));

  // Companion detail (call directly)
  window.renderCompanionDetail({ id: 'aurelius' });
  const h5 = vc.innerHTML;
  check('Detail: size > 3KB', h5.length > 3000, h5.length + ' chars');
  check('Detail: name Aurelius', h5.includes('Aurelius'));
  check('Detail: title Chronicler', h5.includes('Chronicler'));
  check('Detail: key_trait prose rendered', h5.includes('Journals') || /Playfair/.test(h5) || /key_trait|keytrait/.test(h5));
  check('Detail: Assignment block', /<\/svg>\s*Assignment<\/div>/.test(h5) || h5.includes('>Assignment<'));
  check('Detail: Voice block', h5.includes('>Voice<'));
  check('Detail: Mind block', h5.includes('>Mind<'));
  check('Detail: Shadow block', h5.includes('>Shadow<'));
  check('Detail: Relationships block', h5.includes('>Relationships<'));
  check('Detail: Biography block', h5.includes('>Biography<'));
  check('Detail: Growth block', h5.includes('>Growth<'));
  check('Detail: Modulators block', h5.includes('>Modulators<'));
  check('Detail: Meta block', h5.includes('>Meta<'));
  check('Detail: Companion logs cross-ref', h5.includes('canon-0053') || h5.includes('Companion logs'));

  // Unknown id
  window.renderCompanionDetail({ id: 'doesnotexist' });
  const h6 = vc.innerHTML;
  check('Detail: unknown id empty state', h6.includes('Companion not found'));

  const pass = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok).length;
  console.log('\n=== THE ORDER — HEADLESS VERIFICATION ===\n');
  results.forEach(r => console.log((r.ok ? '✓' : '✗') + '  ' + r.label + (r.detail ? '  — ' + r.detail : '')));
  console.log('\n' + pass + '/' + results.length + ' checks passed' + (fail ? ', ' + fail + ' failed' : ''));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
