/* ============================================================
   engine.js — Stat calculation engine  (Aion 4.x EU)
   ============================================================ */

/**
 * Calculate combined stats:
 *   base stats + gear stats + set bonuses + active skill bonuses
 */
function calculateStats(classId, equipment, activeSkillIds = []) {
  const base  = BASE_STATS[classId] || BASE_STATS.gladiator;
  const stats = { ...base };

  // 1) Gear
  Object.values(equipment).forEach(item => {
    if (!item?.stats) return;
    Object.entries(item.stats).forEach(([k, v]) => {
      if (typeof v === 'number') stats[k] = (stats[k] || 0) + v;
    });
  });

  // 2) Set bonuses
  computeSetBonuses(equipment).forEach(bonus => {
    if (!bonus.active) return;
    Object.entries(bonus.stats).forEach(([k, v]) => {
      stats[k] = (stats[k] || 0) + v;
    });
  });

  // 3) Active skill bonuses (Amplification tab)
  if (activeSkillIds.length > 0) {
    const classSkills = CLASS_SKILLS[classId] || [];
    activeSkillIds.forEach(skillId => {
      const skill = classSkills.find(s => s.id === skillId);
      if (!skill) return;
      Object.entries(skill.stats).forEach(([k, v]) => {
        if (typeof v === 'number') stats[k] = (stats[k] || 0) + v;
      });
    });
  }

  return stats;
}

/**
 * Compute which set bonuses are active.
 */
function computeSetBonuses(equipment) {
  const equippedIds = Object.values(equipment).filter(Boolean).map(i => i.id);
  const result = [];

  SET_BONUSES.forEach(setDef => {
    const count = setDef.items.filter(id => equippedIds.includes(id)).length;
    if (count === 0) return;
    setDef.bonuses.forEach(bonus => {
      result.push({
        setId:          setDef.id,
        name:           setDef.name,
        piecesEquipped: count,
        piecesRequired: bonus.pieces,
        active:         count >= bonus.pieces,
        stats:          bonus.stats,
        label:          bonus.label
      });
    });
  });
  return result;
}

/**
 * Items available for a given equipment slot + class.
 */
function getItemsForSlot(slot, classId) {
  switch (slot) {
    case 'weapon':
      return ITEMS.weapons.filter(w => !w.class || w.class.includes(classId));
    case 'subWeapon':
      return ITEMS.weapons.filter(w =>
        w.slot === 'subWeapon' && (!w.class || w.class.includes(classId))
      );
    case 'helmet':
    case 'shoulders':
    case 'chest':
    case 'gloves':
    case 'pants':
    case 'boots':
      return ITEMS.armor.filter(a =>
        a.slot === slot && a.armorType === (ARMOR_TYPES[classId] || 'plate')
      );
    case 'wings':
      return ITEMS.armor.filter(a => a.slot === 'wings');
    case 'necklace':
      return ITEMS.accessories.filter(a => a.slot === 'necklace');
    case 'ring1':
    case 'ring2':
      return ITEMS.accessories.filter(a => a.slot === 'ring');
    case 'earring1':
    case 'earring2':
      return ITEMS.accessories.filter(a => a.slot === 'earring');
    case 'belt':
      return ITEMS.accessories.filter(a => a.slot === 'belt');
    default:
      return [];
  }
}

/**
 * Format a single stat value for display.
 */
function formatStatValue(key, val) {
  if (val === undefined || val === null) return '—';
  if (typeof val === 'string') return val;
  if (key === 'atkSpeed' || key === 'castingSpeed') return val.toFixed(3);
  if (key === 'speed')       return val.toFixed(1);
  if (key === 'flightSpeed') return val.toFixed(1);
  if (key === 'dmgReduction') return val;
  if (Number.isInteger(val)) return val.toLocaleString('en-US');
  return val.toString();
}

/**
 * Serialize build to base64 URL hash (includes active skill IDs).
 */
function serializeBuild(classId, sets, activeSkillIds = []) {
  const data = {
    c: classId,
    sk: activeSkillIds,
    s: sets.map(s => {
      const eq = {};
      Object.entries(s.equipment).forEach(([slot, item]) => {
        if (item) eq[slot] = item.id;
      });
      return { name: s.name, eq };
    })
  };
  return btoa(JSON.stringify(data));
}

/**
 * Deserialize build from base64 URL hash.
 */
function deserializeBuild(str) {
  try {
    const data    = JSON.parse(atob(str));
    const allItems = [
      ...ITEMS.weapons, ...ITEMS.armor, ...ITEMS.accessories
    ];
    const sets = data.s.map(s => {
      const equipment = {};
      Object.entries(s.eq).forEach(([slot, id]) => {
        equipment[slot] = allItems.find(i => i.id === id) || null;
      });
      return { name: s.name, equipment };
    });
    return { classId: data.c, sets, activeSkillIds: data.sk || [] };
  } catch {
    return null;
  }
}
