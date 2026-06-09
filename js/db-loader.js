/* ================================================================
   db-loader.js  –  Aion Gear Calculator × Scraped Database
   ================================================================
   Lädt die gescrapten JSON-Dateien und ersetzt/erweitert die
   statischen Daten in data.js (ITEMS, CLASS_SKILLS).

   EINBINDUNG in index.html:
     <script src="js/data.js"></script>
     <script src="js/db-loader.js"></script>   ← diese Datei
     <script src="js/engine.js"></script>
     <script src="js/ui.js"></script>
     <script src="js/app.js"></script>

   App-Start in app.js ÄNDERN:
     Vorher:  document.addEventListener('DOMContentLoaded', App.init);
     Nachher: document.addEventListener('DOMContentLoaded', () =>
                AionDB.init().then(App.init)
              );
   ================================================================ */

const AionDB = (() => {

  // Pfad zu den gescrapten Dateien (relativ zu index.html)
  const BASE = 'data/scraped/';

  // ── Grade-Normalisierung ────────────────────────────────────
  // Scraper liefert "Eternal", engine.js erwartet "eternal"
  function normaliseGrade(g) {
    return (g || '').toLowerCase();
  }

  // ── Stat-Key-Mapping ────────────────────────────────────────
  // Spaltennamen von query.php → interne Keys wie engine.js sie kennt
  const STAT_KEY_MAP = {
    // Physisch
    'rAtk':'rAtk', 'attack':'rAtk',
    'rAcc':'rAcc', 'accuracy':'rAcc',
    'rCrit':'rCrit', 'crit_strike':'rCrit',
    'physDef':'physDef', 'physical_def':'physDef',
    'block':'block', 'parry':'parry', 'evasion':'evasion',
    // Magie
    'magicBoost':'magicBoost', 'magic_boost':'magicBoost',
    'magicAcc':'magicAcc',  'magical_acc':'magicAcc',
    'magicCrit':'magicCrit',
    'magRes':'magRes',      'magic_resist':'magRes',
    'magDef':'magDef',      'magical_defense':'magDef',
    'magSupp':'magSupp',
    // HP/MP
    'hp':'hp', 'mp':'mp',
    // Healing
    'healingBoost':'healingBoost',
    // PvP/PvE
    'pvpAtk':'pvpAtk', 'pvpDef':'pvpDef',
    'pveAtk':'pveAtk', 'pveDef':'pveDef',
    // Resistances
    'strikeRes':'strikeRes', 'strikeFort':'strikeFort',
    'spellRes':'spellRes',   'spellFort':'spellFort',
    'fireDef':'fireDef',  'earthDef':'earthDef',
    'windDef':'windDef',  'waterDef':'waterDef',
    'silenceRes':'silenceRes', 'paraRes':'paraRes',
    // Bewegung
    'speed':'speed', 'flightSpeed':'flightSpeed', 'flightTime':'flightTime',
    // Sonstiges
    'enmityBoost':'enmityBoost',
  };

  function normaliseStats(raw) {
    if (!raw) return {};
    const out = {};
    for (const [k, v] of Object.entries(raw)) {
      const mapped = STAT_KEY_MAP[k] || k;
      const num = typeof v === 'string' ? parseFloat(v) : v;
      out[mapped] = isNaN(num) ? v : num;
    }
    return out;
  }

  // ── Item-Transformation ─────────────────────────────────────
  // Scraped JSON → Format das engine.js erwartet
  function transformItem(raw) {
    return {
      id:           raw.id,
      name:         raw.name,
      // icon: volle URL vom Scraper, Fallback auf lokales assets/icons/
      icon:         raw.icon_url || `assets/icons/${raw.id}.png`,
      grade:        normaliseGrade(raw.grade),
      slot:         raw.slot,
      armorType:    raw.armor_type || null,
      weaponType:   raw.subtype   || null,
      class:        Array.isArray(raw.classes) ? raw.classes : [],
      requiredLevel:raw.required_level || 0,
      stats:        normaliseStats(raw.stats),
      // Felder die engine.js braucht
      set:          raw.set_id    || null,
      source_url:   raw.source_url || null,
    };
  }

  // ── Skill-Transformation ────────────────────────────────────
  // Scraped Skill → Format das CLASS_SKILLS / renderAmpPanel erwartet
  // engine.js nutzt skill.id + skill.stats für Berechnungen
  // Da der Scraper keine Stat-Werte von Skills hat (keine Detail-Seiten),
  // werden passive Skills OHNE stats gespeichert – sie zeigen nur
  // Info an. Für Stat-Berechnungen bleiben die manuellen CLASS_SKILLS
  // aus data.js als Fallback.
  function transformSkill(raw) {
    return {
      id:         raw.id,
      name:       raw.display_name || raw.base_name,
      base_name:  raw.base_name,
      max_level:  raw.max_level || 1,
      skill_type: raw.skill_type,   // active / passive / stigma_active / stigma_passive
      icon:       raw.icon_url || null,
      mp_cost:    raw.mp_cost  || null,
      cooldown:   raw.cooldown || null,
      cast_time:  raw.cast_time || null,
      range:      raw.range    || null,
      source_url: raw.source_url || null,
      // stats bleibt leer – wird aus data.js CLASS_SKILLS übernommen falls vorhanden
      stats:      {},
    };
  }

  // ── Fetch-Helper ────────────────────────────────────────────
  async function loadJSON(file) {
    const r = await fetch(BASE + file);
    if (!r.ok) throw new Error(`${r.status} ${file}`);
    return r.json();
  }

  // ── Merge: Scraped Skills mit manuellen Stats zusammenführen ─
  // Bestehende CLASS_SKILLS aus data.js haben echte Stat-Werte.
  // Gescrapte Skills haben Namen/Icons/Cooldowns.
  // Ergebnis: maximale Info für jeden Skill.
  function mergeSkills(classId, scrapedSkills) {
    const manual = (typeof CLASS_SKILLS !== 'undefined')
      ? (CLASS_SKILLS[classId] || [])
      : [];

    // Manuelle Skills als Map: Basisname (lowercase) → skill
    const manualMap = {};
    manual.forEach(s => {
      manualMap[s.name.toLowerCase()] = s;
    });

    // Alle gescrapten passive/stigma_passive Skills
    const passiveTypes = new Set(['passive','stigma_passive']);
    const result = [];

    scrapedSkills.forEach(skill => {
      const baseLower = skill.base_name.toLowerCase();
      const manual_match = manualMap[baseLower]
        || Object.values(manualMap).find(m =>
            m.name.toLowerCase().includes(baseLower) ||
            baseLower.includes(m.name.toLowerCase())
          );

      if (manual_match) {
        // Gescrapte Metadaten + manuelle Stats kombinieren
        result.push({
          ...skill,
          stats: manual_match.stats || {},
          // ID aus data.js behalten wenn vorhanden (für localStorage-Kompatibilität)
          id: manual_match.id,
        });
        // Aus manualMap entfernen damit keine Duplikate entstehen
        delete manualMap[baseLower];
      } else if (passiveTypes.has(skill.skill_type)) {
        // Unbekannter passiver Skill – ohne Stats aufnehmen
        result.push(skill);
      }
    });

    // Verbleibende manuelle Skills die nicht im Scrape waren, trotzdem behalten
    Object.values(manualMap).forEach(s => result.push(s));

    return result;
  }

  // ── Haupt-Init ──────────────────────────────────────────────
  async function init() {
    console.log('[AionDB] Lade gescrapte Daten…');
    const t0 = Date.now();

    try {
      // Items laden
      const allRaw = await loadJSON('items_all.json');
      const allItems = allRaw.map(transformItem);

      // ITEMS global patchen
      const weapons     = allItems.filter(i => i.slot === 'weapon' || i.armorType === null && i.weaponType);
      const armor       = allItems.filter(i => ['chest','gloves','shoulders','pants','boots','helmet','subWeapon'].includes(i.slot));
      const accessories = allItems.filter(i => ['necklace','ring','earring','belt','helmet'].includes(i.slot) && !armor.find(a => a.id === i.id));
      const wings       = allItems.filter(i => i.slot === 'wings');

      // Kategorie-basiertes Patching (sicherer als slot-basiertes)
      const byCategory = {};
      allRaw.forEach(r => {
        (byCategory[r.category] = byCategory[r.category] || []).push(transformItem(r));
      });

      if (byCategory.weapon     ?.length) ITEMS.weapons     = byCategory.weapon;
      if (byCategory.armor      ?.length) ITEMS.armor       = byCategory.armor;
      if (byCategory.accessory  ?.length) ITEMS.accessories = byCategory.accessory;
      if (byCategory.wing       ?.length) ITEMS.wings       = byCategory.wing;

      console.log(`[AionDB] Items: ${allItems.length} (${Object.entries(byCategory).map(([k,v])=>`${k}:${v.length}`).join(', ')})`);

      // Skills laden (pro Klasse)
      const classIds = ['gladiator','templar','assassin','ranger','sorcerer',
                        'spiritmaster','cleric','chanter','gunslinger','songweaver','aethertech'];

      for (const classId of classIds) {
        try {
          const raw = await loadJSON(`skills_${classId}.json`);
          const scraped = raw.map(transformSkill);
          CLASS_SKILLS[classId] = mergeSkills(classId, scraped);
        } catch (e) {
          console.warn(`[AionDB] Keine Skills für ${classId}: ${e.message}`);
          // data.js Fallback bleibt erhalten
        }
      }

      const totalSkills = classIds.reduce((n, c) => n + (CLASS_SKILLS[c]?.length || 0), 0);
      console.log(`[AionDB] Skills: ${totalSkills} gesamt`);
      console.log(`[AionDB] Fertig in ${Date.now()-t0}ms`);

    } catch (err) {
      console.error('[AionDB] Fehler beim Laden:', err);
      console.warn('[AionDB] Verwende data.js Fallback-Daten');
    }
  }

  // ── Hilfsfunktionen für Templates ──────────────────────────

  /**
   * Gibt alle Skills einer Klasse nach Typ gefiltert zurück.
   * Typen: 'active' | 'passive' | 'stigma_active' | 'stigma_passive' | 'all'
   */
  function getSkills(classId, type = 'all') {
    const skills = CLASS_SKILLS[classId] || [];
    if (type === 'all') return skills;
    return skills.filter(s => s.skill_type === type);
  }

  /**
   * Gibt alle passiven Skills zurück (passive + stigma_passive).
   * Das sind die die engine.js für Stat-Berechnungen nutzt.
   */
  function getPassiveSkills(classId) {
    const skills = CLASS_SKILLS[classId] || [];
    return skills.filter(s =>
      s.skill_type === 'passive' || s.skill_type === 'stigma_passive'
    );
  }

  return { init, getSkills, getPassiveSkills };

})();
