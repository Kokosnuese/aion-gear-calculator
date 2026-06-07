/* ============================================================
   engine.js — Stat calculation engine
   ============================================================ */

/**
 * Calculate combined stats from equipped items + base + set bonuses.
 * Returns a flat object of all stats.
 */
function calculateStats(classId, equipment) {
  const base = BASE_STATS[classId] || BASE_STATS.gladiator;
  const stats = { ...base };

  // Add item stats
  Object.values(equipment).forEach(item => {
    if (!item || !item.stats) return;
    Object.entries(item.stats).forEach(([key, val]) => {
      if (typeof val === 'number') {
        stats[key] = (stats[key] || 0) + val;
      }
    });
  });

  // Add set bonuses
  const setData = computeSetBonuses(equipment);
  setData.forEach(bonus => {
    if (!bonus.active) return;
    Object.entries(bonus.stats).forEach(([key, val]) => {
      stats[key] = (stats[key] || 0) + val;
    });
  });

  return stats;
}

/**
 * Compute which set bonuses are active.
 * Returns array of { setId, name, piecesRequired, piecesEquipped, active, stats, label }
 */
function computeSetBonuses(equipment) {
  const equippedIds = Object.values(equipment)
    .filter(Boolean)
    .map(i => i.id);

  const result = [];

  SET_BONUSES.forEach(setDef => {
    const count = setDef.items.filter(id => equippedIds.includes(id)).length;
    if (count === 0) return;

    setDef.bonuses.forEach(bonus => {
      result.push({
        setId: setDef.id,
        name: setDef.name,
        piecesEquipped: count,
        piecesRequired: bonus.pieces,
        active: count >= bonus.pieces,
        stats: bonus.stats,
        label: bonus.label
      });
    });
  });

  return result;
}

/**
 * Get items available for a given slot + class
 */
function getItemsForSlot(slot, classId) {
  switch (slot) {
    case 'weapon':
      return ITEMS.weapons.filter(w =>
        !w.class || w.class.includes(classId)
      );
    case 'subWeapon':
      // Off-hand: class specific, some use shield
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
        a.slot === slot &&
        a.armorType === (ARMOR_TYPES[classId] || 'plate')
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
 * Format a stat value for display
 */
function formatStatValue(key, val) {
  if (val === undefined || val === null) return '—';
  if (typeof val === 'string') return val;
  if (key === 'atkSpeed' || key === 'castingSpeed') {
    return val.toFixed(3) + ' (+5%)';
  }
  if (key === 'speed') return val.toFixed(1) + ' (+5%)';
  if (key === 'flightSpeed') return val.toFixed(1);
  if (key === 'dmgReduction') return val;
  if (Number.isInteger(val)) return val.toLocaleString();
  return val.toString();
}

/**
 * Serialize equipment to URL-safe string for sharing
 */
function serializeBuild(classId, sets) {
  const data = { c: classId, s: sets.map(s => {
    const eq = {};
    Object.entries(s.equipment).forEach(([slot, item]) => {
      if (item) eq[slot] = item.id;
    });
    return { name: s.name, eq };
  })};
  return btoa(JSON.stringify(data));
}

/**
 * Deserialize build from URL
 */
function deserializeBuild(str) {
  try {
    const data = JSON.parse(atob(str));
    const allItems = [...ITEMS.weapons, ...ITEMS.armor, ...ITEMS.accessories];
    const sets = data.s.map(s => {
      const equipment = {};
      Object.entries(s.eq).forEach(([slot, id]) => {
        equipment[slot] = allItems.find(i => i.id === id) || null;
      });
      return { name: s.name, equipment };
    });
    return { classId: data.c, sets };
  } catch {
    return null;
  }
}
