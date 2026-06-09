/* ============================================================
   data.js — All static game data  (Aion 4.x EU)
   ============================================================ */

const CLASSES = [
  { id: "gladiator",    name: "Gladiator"    },
  { id: "templar",      name: "Templar"      },
  { id: "assassin",     name: "Assassin"     },
  { id: "ranger",       name: "Ranger"       },
  { id: "sorcerer",     name: "Sorcerer"     },
  { id: "spiritmaster", name: "Spiritmaster" },
  { id: "cleric",       name: "Cleric"       },
  { id: "chanter",      name: "Chanter"      },
  { id: "gunslinger",   name: "Gunslinger"   },
  { id: "songweaver",   name: "Songweaver"   },
  { id: "aethertech",   name: "Aethertech"   }
];

const ARMOR_TYPES = {
  gladiator: "plate",  templar: "plate",
  assassin: "leather", ranger: "leather", gunslinger: "leather",
  sorcerer: "cloth",   spiritmaster: "cloth", songweaver: "cloth",
  cleric: "chain",     chanter: "chain",
  aethertech: "plate"
};

const WEAPON_TYPES = {
  gladiator:    ["greatsword","polearm"],
  templar:      ["greatsword","sword"],
  assassin:     ["dagger","sword"],
  ranger:       ["bow"],
  sorcerer:     ["orb","spellbook"],
  spiritmaster: ["orb","spellbook"],
  cleric:       ["mace"],
  chanter:      ["staff"],
  gunslinger:   ["pistol"],
  songweaver:   ["harp"],
  aethertech:   ["cipher_blade"]
};

const CLASS_EMBLEMS = {
  gladiator:    "assets/ui/icon_emblem_fighter.png",
  templar:      "assets/ui/icon_emblem_knight.png",
  assassin:     "assets/ui/icon_emblem_assassin.png",
  ranger:       "assets/ui/icon_emblem_ranger.png",
  sorcerer:     "assets/ui/icon_emblem_wizard.png",
  spiritmaster: "assets/ui/icon_emblem_elementalist.png",
  cleric:       "assets/ui/icon_emblem_wizard.png",
  chanter:      "assets/ui/icon_emblem_chanter.png",
  gunslinger:   "assets/ui/Icon_emblem_Gunner.png",
  songweaver:   "assets/ui/Icon_emblem_Bard.png",
  aethertech:   "assets/ui/icon_emblem_knight.png"
};

const SLOT_ICONS = {
  helmet:    "assets/ui/Helmet.png",
  shoulders: "assets/ui/Shoulder.png",
  weapon:    "assets/ui/Weapon.png",
  subWeapon: "assets/ui/Shield.png",
  chest:     "assets/ui/Breast.png",
  gloves:    "assets/ui/Glove.png",
  pants:     "assets/ui/Pants.png",
  boots:     "assets/ui/Shoes.png",
  wings:     "assets/ui/Wings.png",
  necklace:  "assets/ui/Necklaces.png",
  earring1:  "assets/ui/EarringL.png",
  earring2:  "assets/ui/EarringR.png",
  ring1:     "assets/ui/RingL.png",
  ring2:     "assets/ui/RingR.png",
  belt:      "assets/ui/Belt.png"
};

const SLOT_LABELS = {
  helmet: "Helmet", shoulders: "Shoulders", weapon: "Weapon",
  subWeapon: "Off-Hand", chest: "Chest", gloves: "Gloves",
  pants: "Pants", boots: "Boots", wings: "Wings",
  necklace: "Necklace", earring1: "Earring L", earring2: "Earring R",
  ring1: "Ring L", ring2: "Ring R", belt: "Belt"
};

/* ── BASE STATS (Aion 4.x, Level 65 base) ─────────────────── */
const BASE_STATS = {
  gladiator: {
    hp:10671, mp:1740, atkRange:0, atkSpeed:1.425, castingSpeed:0.95,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"2.0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:55, rAcc:810, rCrit:2, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:0, magicAcc:996, magicCrit:50,
    power:115, hpStat:115, precision:100, agility:100, knowledge:90, will:90,
    physDef:0, block:1028, dmgReduction:"0.0%", reduceMax:0,
    parry:1008, evasion:928, strikeRes:120, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  templar: {
    hp:11500, mp:1740, atkRange:0, atkSpeed:1.40, castingSpeed:0.90,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"5.0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:45, rAcc:780, rCrit:0, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:0, magicAcc:900, magicCrit:30,
    power:120, hpStat:125, precision:100, agility:95, knowledge:85, will:100,
    physDef:0, block:1200, dmgReduction:"0.0%", reduceMax:0,
    parry:1100, evasion:850, strikeRes:140, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  assassin: {
    hp:9200, mp:1740, atkRange:0, atkSpeed:1.50, castingSpeed:1.00,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:85, rAcc:880, rCrit:30, lAtk:65, lAcc:860, lCrit:25,
    magicBoost:0, magicAcc:950, magicCrit:50,
    power:105, hpStat:100, precision:110, agility:115, knowledge:85, will:85,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:1100, strikeRes:100, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  ranger: {
    hp:9400, mp:1740, atkRange:0, atkSpeed:1.60, castingSpeed:1.00,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:78, rAcc:900, rCrit:20, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:0, magicAcc:940, magicCrit:45,
    power:100, hpStat:100, precision:115, agility:112, knowledge:88, will:90,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:1050, strikeRes:90, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  sorcerer: {
    hp:8100, mp:3400, atkRange:0, atkSpeed:1.30, castingSpeed:1.10,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:30, rAcc:700, rCrit:0, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:250, magicAcc:1100, magicCrit:80,
    power:90, hpStat:90, precision:92, agility:90, knowledge:130, will:125,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:900, strikeRes:70, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  spiritmaster: {
    hp:7900, mp:3500, atkRange:0, atkSpeed:1.30, castingSpeed:1.10,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:28, rAcc:690, rCrit:0, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:240, magicAcc:1080, magicCrit:75,
    power:88, hpStat:88, precision:90, agility:90, knowledge:132, will:128,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:880, strikeRes:68, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  cleric: {
    hp:9800, mp:3200, atkRange:0, atkSpeed:1.35, castingSpeed:1.05,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:100,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:40, rAcc:750, rCrit:0, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:180, magicAcc:1050, magicCrit:60,
    power:100, hpStat:110, precision:95, agility:95, knowledge:120, will:130,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:920, strikeRes:80, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  chanter: {
    hp:10200, mp:2800, atkRange:0, atkSpeed:1.38, castingSpeed:1.00,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:60,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:50, rAcc:760, rCrit:5, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:130, magicAcc:1000, magicCrit:50,
    power:108, hpStat:108, precision:98, agility:98, knowledge:112, will:120,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:940, strikeRes:85, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  gunslinger: {
    hp:9300, mp:1740, atkRange:0, atkSpeed:1.55, castingSpeed:1.00,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:80, rAcc:870, rCrit:22, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:0, magicAcc:930, magicCrit:40,
    power:102, hpStat:100, precision:112, agility:110, knowledge:88, will:88,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:1020, strikeRes:85, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  songweaver: {
    hp:8200, mp:3200, atkRange:0, atkSpeed:1.32, castingSpeed:1.08,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"0%", concentration:0, healingBoost:50,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:32, rAcc:710, rCrit:0, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:200, magicAcc:1060, magicCrit:65,
    power:92, hpStat:92, precision:92, agility:92, knowledge:126, will:122,
    physDef:0, block:0, dmgReduction:"0.0%", reduceMax:0,
    parry:0, evasion:890, strikeRes:72, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  },
  aethertech: {
    hp:10800, mp:1740, atkRange:0, atkSpeed:1.42, castingSpeed:0.95,
    speed:6.0, flightSpeed:14.0, flightTime:60,
    enmityBoost:"2.0%", concentration:0, healingBoost:0,
    pvpAtk:"1.0%", pvpDef:"1.0%", pveAtk:"1.0%", pveDef:"1.0%",
    rAtk:60, rAcc:820, rCrit:5, lAtk:0, lAcc:0, lCrit:0,
    magicBoost:50, magicAcc:980, magicCrit:40,
    power:112, hpStat:112, precision:102, agility:100, knowledge:95, will:95,
    physDef:0, block:950, dmgReduction:"0.0%", reduceMax:0,
    parry:950, evasion:900, strikeRes:110, strikeFort:0,
    magRes:0, magOffset:0, spellRes:0, spellFort:0,
    fireDef:0, earthDef:0, windDef:0, waterDef:0,
    stumbleResPen:200, naturalHealing:20
  }
};

/* ── STAT DISPLAY CONFIG ──────────────────────────────────── */
const STAT_SECTIONS = {
  general: {
    title: "General",
    keys: ["hp","mp","atkRange","atkSpeed","castingSpeed","speed","flightSpeed","flightTime","enmityBoost","concentration","healingBoost"]
  },
  // FIX: key is "pvp" → capitalize() → "Pvp" → id must be "statsPvp"
  pvp: {
    title: "PvP / PvE",
    keys: ["pvpAtk","pvpDef","pveAtk","pveDef"]
  },
  offense: {
    title: "Offense",
    keys: ["rAtk","rAcc","rCrit","lAtk","lAcc","lCrit","magicBoost","magicAcc","magicCrit","power","hpStat","precision","agility","knowledge","will"]
  },
  defense: {
    title: "Defense",
    keys: ["physDef","block","dmgReduction","reduceMax","parry","evasion","strikeRes","strikeFort","magRes","magOffset","spellRes","spellFort","fireDef","earthDef","windDef","waterDef","stumbleResPen","naturalHealing"]
  }
};

const STAT_NAMES = {
  hp:"HP", mp:"MP", atkRange:"Atk Range", atkSpeed:"Atk Speed",
  castingSpeed:"Casting Speed", speed:"Speed", flightSpeed:"Flight Speed",
  flightTime:"Flight Time", enmityBoost:"Enmity Boost", concentration:"Concentration",
  healingBoost:"Healing Boost",
  pvpAtk:"PvP Attack", pvpDef:"PvP Defense", pveAtk:"PvE Attack", pveDef:"PvE Defense",
  rAtk:"[R] Attack", rAcc:"[R] Accuracy", rCrit:"[R] Crit Strike",
  lAtk:"[L] Attack", lAcc:"[L] Accuracy", lCrit:"[L] Crit Strike",
  magicBoost:"Magic Boost", magicAcc:"Magic Accuracy", magicCrit:"Magic Crit",
  power:"Power", hpStat:"HP (Stat)", precision:"Precision", agility:"Agility",
  knowledge:"Knowledge", will:"Will",
  physDef:"Physical Def", block:"Block", dmgReduction:"Damage Reduction",
  reduceMax:"Reduce Max", parry:"Parry", evasion:"Evasion",
  strikeRes:"Strike Resist", strikeFort:"Strike Fortitude",
  magRes:"Magic Resistance", magOffset:"Magic Offset",
  spellRes:"Spell Resist", spellFort:"Spell Fortitude",
  fireDef:"Fire Defense", earthDef:"Earth Defense",
  windDef:"Wind Defense", waterDef:"Water Defense",
  stumbleResPen:"Stumble Res. Pen.", naturalHealing:"Natural Healing",
  attack:"Attack", crit:"Crit Strike", accuracy:"Accuracy",
  physicalDefence:"Physical Def", magicalResist:"Magic Resist"
};

const ITEM_GRADE_COLORS = {
  common:"grade-common", superior:"grade-superior", heroic:"grade-heroic",
  fabled:"grade-legend", eternal:"grade-unique", mythic:"grade-epic",
  rare:"grade-rare", legend:"grade-legend", unique:"grade-unique", epic:"grade-epic"
};

/* ══════════════════════════════════════════════════════════════
   SKILL AMPLIFICATIONS  (Aion 4.x EU, max rank passives)
   Source: aioncodex.com/4x/skills — passive skills only,
   all values at highest available rank.
   These are added on top of base stats when the skill is selected.
══════════════════════════════════════════════════════════════ */
const CLASS_SKILLS = {

  gladiator: [
    { id:"gl_01", name:"Avenging Blow Mastery",   stats:{ rAtk:50, rCrit:30 } },
    { id:"gl_02", name:"Cleave Mastery",           stats:{ rAtk:60 } },
    { id:"gl_03", name:"Body Smash Mastery",       stats:{ rAtk:40, rCrit:20 } },
    { id:"gl_04", name:"Greater Stigma Proficiency", stats:{ rAtk:30, rCrit:50 } },
    { id:"gl_05", name:"HP Boost I",               stats:{ hp:600 } },
    { id:"gl_06", name:"HP Boost II",              stats:{ hp:800 } },
    { id:"gl_07", name:"Physical Attack Boost",    stats:{ rAtk:70 } },
    { id:"gl_08", name:"Crit Strike Boost",        stats:{ rCrit:80 } },
    { id:"gl_09", name:"Parry Boost",              stats:{ parry:150 } },
    { id:"gl_10", name:"Evasion Boost",            stats:{ evasion:100 } },
    { id:"gl_11", name:"Block Boost",              stats:{ block:120 } },
    { id:"gl_12", name:"Accuracy Boost",           stats:{ rAcc:100 } },
    { id:"gl_13", name:"Physical Defense Boost",   stats:{ physDef:200 } },
    { id:"gl_14", name:"Gladiator's Will",         stats:{ rAtk:80, hp:500 } },
    { id:"gl_15", name:"Berserker Training",       stats:{ rAtk:100, physDef:-100 } },
  ],

  templar: [
    { id:"tp_01", name:"Shield of Flame Mastery",  stats:{ block:180, physDef:150 } },
    { id:"tp_02", name:"Righteous Blow Mastery",   stats:{ rAtk:50, rCrit:20 } },
    { id:"tp_03", name:"HP Boost I",               stats:{ hp:800 } },
    { id:"tp_04", name:"HP Boost II",              stats:{ hp:1000 } },
    { id:"tp_05", name:"Block Boost",              stats:{ block:200 } },
    { id:"tp_06", name:"Parry Boost",              stats:{ parry:180 } },
    { id:"tp_07", name:"Physical Defense Boost",   stats:{ physDef:250 } },
    { id:"tp_08", name:"Strike Resist Boost",      stats:{ strikeRes:100 } },
    { id:"tp_09", name:"Magic Resist Boost",       stats:{ magRes:200 } },
    { id:"tp_10", name:"Accuracy Boost",           stats:{ rAcc:80 } },
    { id:"tp_11", name:"Enmity Boost",             stats:{ enmityBoost:"3.0%" } },
    { id:"tp_12", name:"Shield Defense Mastery",   stats:{ block:150, parry:100 } },
    { id:"tp_13", name:"Guardian's Fortitude",     stats:{ hp:1200, physDef:200 } },
    { id:"tp_14", name:"Holy Armor",               stats:{ magRes:300, physDef:100 } },
  ],

  assassin: [
    { id:"as_01", name:"Sigel Strike Mastery",     stats:{ rAtk:60, rCrit:50 } },
    { id:"as_02", name:"Evasion Boost I",          stats:{ evasion:150 } },
    { id:"as_03", name:"Evasion Boost II",         stats:{ evasion:200 } },
    { id:"as_04", name:"Crit Strike Boost",        stats:{ rCrit:100 } },
    { id:"as_05", name:"Physical Attack Boost",    stats:{ rAtk:80 } },
    { id:"as_06", name:"Accuracy Boost",           stats:{ rAcc:120 } },
    { id:"as_07", name:"Dual Wield Mastery",       stats:{ lAtk:50, lCrit:40 } },
    { id:"as_08", name:"HP Boost",                 stats:{ hp:400 } },
    { id:"as_09", name:"Ambush Mastery",           stats:{ rCrit:80, rAtk:40 } },
    { id:"as_10", name:"Speed Boost",              stats:{ speed:0.5 } },
    { id:"as_11", name:"Shadow Dagger Mastery",    stats:{ rAtk:70, rCrit:60 } },
    { id:"as_12", name:"Assassin's Resolve",       stats:{ rAtk:90, evasion:100 } },
  ],

  ranger: [
    { id:"ra_01", name:"Bow Mastery",              stats:{ rAtk:70, rAcc:50 } },
    { id:"ra_02", name:"Crit Strike Boost",        stats:{ rCrit:90 } },
    { id:"ra_03", name:"Evasion Boost",            stats:{ evasion:130 } },
    { id:"ra_04", name:"Accuracy Boost",           stats:{ rAcc:130 } },
    { id:"ra_05", name:"Physical Attack Boost",    stats:{ rAtk:80 } },
    { id:"ra_06", name:"HP Boost",                 stats:{ hp:350 } },
    { id:"ra_07", name:"Hawk Eye",                 stats:{ rAcc:150, rCrit:50 } },
    { id:"ra_08", name:"Rapid Fire Mastery",       stats:{ atkSpeed:0.05, rAtk:50 } },
    { id:"ra_09", name:"Trap Mastery",             stats:{ rCrit:60 } },
    { id:"ra_10", name:"Ranger's Instinct",        stats:{ evasion:150, rAtk:60 } },
  ],

  sorcerer: [
    { id:"so_01", name:"Magic Boost I",            stats:{ magicBoost:60 } },
    { id:"so_02", name:"Magic Boost II",           stats:{ magicBoost:80 } },
    { id:"so_03", name:"Magic Accuracy Boost",     stats:{ magicAcc:100 } },
    { id:"so_04", name:"Magic Crit Boost",         stats:{ magicCrit:80 } },
    { id:"so_05", name:"HP Boost",                 stats:{ hp:350 } },
    { id:"so_06", name:"MP Boost",                 stats:{ mp:300 } },
    { id:"so_07", name:"Casting Speed Boost",      stats:{ castingSpeed:0.05 } },
    { id:"so_08", name:"Evasion Boost",            stats:{ evasion:80 } },
    { id:"so_09", name:"Flame Bolt Mastery",       stats:{ magicBoost:70, magicCrit:50 } },
    { id:"so_10", name:"Blizzard Mastery",         stats:{ magicBoost:60, magicAcc:60 } },
    { id:"so_11", name:"Fire Specialization",      stats:{ fireDef:200, magicBoost:50 } },
    { id:"so_12", name:"Sorcerer's Insight",       stats:{ magicBoost:100, magicCrit:60 } },
  ],

  spiritmaster: [
    { id:"sm_01", name:"Magic Boost I",            stats:{ magicBoost:55 } },
    { id:"sm_02", name:"Magic Boost II",           stats:{ magicBoost:75 } },
    { id:"sm_03", name:"Magic Accuracy Boost",     stats:{ magicAcc:90 } },
    { id:"sm_04", name:"HP Boost",                 stats:{ hp:300 } },
    { id:"sm_05", name:"MP Boost",                 stats:{ mp:350 } },
    { id:"sm_06", name:"Magic Crit Boost",         stats:{ magicCrit:70 } },
    { id:"sm_07", name:"Spirit Mastery",           stats:{ magicBoost:80 } },
    { id:"sm_08", name:"Evasion Boost",            stats:{ evasion:80 } },
    { id:"sm_09", name:"Absorption",               stats:{ magRes:150 } },
    { id:"sm_10", name:"Elemental Affinity",       stats:{ fireDef:150, earthDef:150, windDef:150, waterDef:150 } },
    { id:"sm_11", name:"Spiritmaster's Bond",      stats:{ magicBoost:90, hp:400 } },
  ],

  cleric: [
    { id:"cl_01", name:"Healing Boost I",          stats:{ healingBoost:80 } },
    { id:"cl_02", name:"Healing Boost II",         stats:{ healingBoost:100 } },
    { id:"cl_03", name:"Magic Boost",              stats:{ magicBoost:70 } },
    { id:"cl_04", name:"HP Boost",                 stats:{ hp:600 } },
    { id:"cl_05", name:"MP Boost",                 stats:{ mp:400 } },
    { id:"cl_06", name:"Magic Accuracy Boost",     stats:{ magicAcc:80 } },
    { id:"cl_07", name:"Block Boost",              stats:{ block:100 } },
    { id:"cl_08", name:"Strike Resist Boost",      stats:{ strikeRes:80 } },
    { id:"cl_09", name:"Casting Speed Boost",      stats:{ castingSpeed:0.04 } },
    { id:"cl_10", name:"Resurrection Mastery",     stats:{ healingBoost:60, mp:200 } },
    { id:"cl_11", name:"Holy Ward",                stats:{ magRes:200, physDef:100 } },
    { id:"cl_12", name:"Cleric's Blessing",        stats:{ healingBoost:120, hp:800 } },
  ],

  chanter: [
    { id:"ch_01", name:"Healing Boost",            stats:{ healingBoost:50 } },
    { id:"ch_02", name:"HP Boost I",               stats:{ hp:500 } },
    { id:"ch_03", name:"HP Boost II",              stats:{ hp:700 } },
    { id:"ch_04", name:"Physical Attack Boost",    stats:{ rAtk:55 } },
    { id:"ch_05", name:"Magic Boost",              stats:{ magicBoost:60 } },
    { id:"ch_06", name:"Strike Resist Boost",      stats:{ strikeRes:90 } },
    { id:"ch_07", name:"Block Boost",              stats:{ block:90 } },
    { id:"ch_08", name:"Parry Boost",              stats:{ parry:100 } },
    { id:"ch_09", name:"Staff Mastery",            stats:{ rAtk:65, rCrit:30 } },
    { id:"ch_10", name:"MP Boost",                 stats:{ mp:350 } },
    { id:"ch_11", name:"Word of Inspiration",      stats:{ magicBoost:70, healingBoost:60 } },
    { id:"ch_12", name:"Chanter's Vigor",          stats:{ hp:600, rAtk:50 } },
  ],

  gunslinger: [
    { id:"gu_01", name:"Pistol Mastery",           stats:{ rAtk:75, rAcc:60 } },
    { id:"gu_02", name:"Crit Strike Boost",        stats:{ rCrit:80 } },
    { id:"gu_03", name:"Accuracy Boost",           stats:{ rAcc:110 } },
    { id:"gu_04", name:"Evasion Boost",            stats:{ evasion:120 } },
    { id:"gu_05", name:"HP Boost",                 stats:{ hp:400 } },
    { id:"gu_06", name:"Physical Attack Boost",    stats:{ rAtk:80 } },
    { id:"gu_07", name:"Rapid Shot Mastery",       stats:{ atkSpeed:0.04, rAtk:50 } },
    { id:"gu_08", name:"Burst Fire Mastery",       stats:{ rAtk:90, rCrit:50 } },
    { id:"gu_09", name:"Gunslinger's Focus",       stats:{ rAcc:140, rCrit:60 } },
  ],

  songweaver: [
    { id:"sw_01", name:"Magic Boost I",            stats:{ magicBoost:60 } },
    { id:"sw_02", name:"Magic Boost II",           stats:{ magicBoost:75 } },
    { id:"sw_03", name:"Healing Boost",            stats:{ healingBoost:60 } },
    { id:"sw_04", name:"HP Boost",                 stats:{ hp:350 } },
    { id:"sw_05", name:"MP Boost",                 stats:{ mp:400 } },
    { id:"sw_06", name:"Magic Accuracy Boost",     stats:{ magicAcc:80 } },
    { id:"sw_07", name:"Magic Crit Boost",         stats:{ magicCrit:65 } },
    { id:"sw_08", name:"Evasion Boost",            stats:{ evasion:80 } },
    { id:"sw_09", name:"Song of Resonance",        stats:{ magicBoost:80, healingBoost:50 } },
    { id:"sw_10", name:"Songweaver's Harmony",     stats:{ magicBoost:90, mp:300 } },
  ],

  aethertech: [
    { id:"at_01", name:"Cipher-Blade Mastery",     stats:{ rAtk:65, rCrit:40 } },
    { id:"at_02", name:"HP Boost I",               stats:{ hp:600 } },
    { id:"at_03", name:"HP Boost II",              stats:{ hp:800 } },
    { id:"at_04", name:"Block Boost",              stats:{ block:150 } },
    { id:"at_05", name:"Parry Boost",              stats:{ parry:130 } },
    { id:"at_06", name:"Physical Defense Boost",   stats:{ physDef:180 } },
    { id:"at_07", name:"Physical Attack Boost",    stats:{ rAtk:70 } },
    { id:"at_08", name:"Magic Boost",              stats:{ magicBoost:60 } },
    { id:"at_09", name:"Strike Resist Boost",      stats:{ strikeRes:100 } },
    { id:"at_10", name:"Aetheric Field Mastery",   stats:{ block:180, physDef:150 } },
    { id:"at_11", name:"Aethertech's Charge",      stats:{ rAtk:80, magicBoost:50 } },
  ],
};

/* ── ITEMS ─────────────────────────────────────────────────── */
const ITEMS = {
  weapons: [
    { id:1001, name:"Tahabata's Greatsword",   icon:"1001.png", grade:"eternal",
      class:["gladiator","templar"], slot:"weapon", weaponType:"greatsword",
      stats:{ rAtk:245, rCrit:50, rAcc:0 } },
    { id:1002, name:"Arena Greatsword",        icon:"1002.png", grade:"fabled",
      class:["gladiator","templar"], slot:"weapon", weaponType:"greatsword",
      stats:{ rAtk:265, rCrit:20, rAcc:0 } },
    { id:1003, name:"Inggison Polearm",        icon:"1003.png", grade:"heroic",
      class:["gladiator"], slot:"weapon", weaponType:"polearm",
      stats:{ rAtk:210, rCrit:30, rAcc:0 } },
    { id:1101, name:"Tahabata's Dagger",       icon:"1101.png", grade:"eternal",
      class:["assassin"], slot:"weapon", weaponType:"dagger",
      stats:{ rAtk:195, rCrit:80, rAcc:20 } },
    { id:1102, name:"Miragent Dagger",         icon:"1102.png", grade:"fabled",
      class:["assassin"], slot:"weapon", weaponType:"dagger",
      stats:{ rAtk:185, rCrit:90, rAcc:10 } },
    { id:1201, name:"Tahabata's Bow",          icon:"1201.png", grade:"eternal",
      class:["ranger"], slot:"weapon", weaponType:"bow",
      stats:{ rAtk:260, rCrit:35, rAcc:10 } },
    { id:1301, name:"Tahabata's Orb",          icon:"1301.png", grade:"eternal",
      class:["sorcerer","spiritmaster"], slot:"weapon", weaponType:"orb",
      stats:{ magicBoost:210, magicAcc:50, magicCrit:30 } },
    { id:1401, name:"Tahabata's Mace",         icon:"1401.png", grade:"eternal",
      class:["cleric","chanter"], slot:"weapon", weaponType:"mace",
      stats:{ rAtk:160, magicBoost:150, healingBoost:20 } },
    { id:1501, name:"Arena Pistol",            icon:"1501.png", grade:"fabled",
      class:["gunslinger"], slot:"weapon", weaponType:"pistol",
      stats:{ rAtk:230, rCrit:40, rAcc:0 } },
    { id:1601, name:"Tahabata's Harp",         icon:"1601.png", grade:"eternal",
      class:["songweaver"], slot:"weapon", weaponType:"harp",
      stats:{ magicBoost:180, rAtk:90, rAcc:30 } },
    { id:1701, name:"Aethertech Cipher-Blade", icon:"1701.png", grade:"fabled",
      class:["aethertech"], slot:"weapon", weaponType:"cipher_blade",
      stats:{ rAtk:280, rAcc:10 } }
  ],
  armor: [
    // Plate
    { id:2001, name:"Tahabata's Helmet",      icon:"2001.png", grade:"eternal",
      slot:"helmet",    armorType:"plate", set:"tahabata",
      stats:{ hp:380, block:55, parry:40 } },
    { id:2002, name:"Tahabata's Breastplate", icon:"2002.png", grade:"eternal",
      slot:"chest",     armorType:"plate", set:"tahabata",
      stats:{ hp:720, physDef:180, block:65 } },
    { id:2003, name:"Tahabata's Gauntlets",   icon:"2003.png", grade:"eternal",
      slot:"gloves",    armorType:"plate", set:"tahabata",
      stats:{ hp:280, rCrit:30, rAtk:15 } },
    { id:2004, name:"Tahabata's Greaves",     icon:"2004.png", grade:"eternal",
      slot:"pants",     armorType:"plate", set:"tahabata",
      stats:{ hp:580, physDef:140, block:40 } },
    { id:2005, name:"Tahabata's Sabatons",    icon:"2005.png", grade:"eternal",
      slot:"boots",     armorType:"plate", set:"tahabata",
      stats:{ hp:260, evasion:40 } },
    { id:2006, name:"Tahabata's Pauldrons",   icon:"2006.png", grade:"eternal",
      slot:"shoulders", armorType:"plate", set:"tahabata",
      stats:{ hp:310, physDef:90, block:30 } },
    // Leather
    { id:2101, name:"Miragent's Hood",        icon:"2101.png", grade:"fabled",
      slot:"helmet",    armorType:"leather", set:"miragent",
      stats:{ hp:310, rCrit:40, evasion:35 } },
    { id:2102, name:"Miragent's Jerkin",      icon:"2102.png", grade:"fabled",
      slot:"chest",     armorType:"leather", set:"miragent",
      stats:{ hp:600, rCrit:50, evasion:60 } },
    { id:2103, name:"Miragent's Gloves",      icon:"2103.png", grade:"fabled",
      slot:"gloves",    armorType:"leather", set:"miragent",
      stats:{ hp:240, rCrit:45, rAcc:20 } },
    { id:2104, name:"Miragent's Leggings",    icon:"2104.png", grade:"fabled",
      slot:"pants",     armorType:"leather", set:"miragent",
      stats:{ hp:490, evasion:55, rAcc:25 } },
    { id:2105, name:"Miragent's Shoes",       icon:"2105.png", grade:"fabled",
      slot:"boots",     armorType:"leather", set:"miragent",
      stats:{ hp:220, evasion:45 } },
    { id:2106, name:"Miragent's Pauldrons",   icon:"2106.png", grade:"fabled",
      slot:"shoulders", armorType:"leather", set:"miragent",
      stats:{ hp:260, rCrit:35, evasion:30 } },
    // Cloth
    { id:2201, name:"Fenris's Hat",           icon:"2201.png", grade:"eternal",
      slot:"helmet",    armorType:"cloth", set:"fenris",
      stats:{ hp:260, magicBoost:70, magicCrit:25 } },
    { id:2202, name:"Fenris's Tunic",         icon:"2202.png", grade:"eternal",
      slot:"chest",     armorType:"cloth", set:"fenris",
      stats:{ hp:520, magicBoost:120, magicCrit:30 } },
    { id:2203, name:"Fenris's Gloves",        icon:"2203.png", grade:"eternal",
      slot:"gloves",    armorType:"cloth", set:"fenris",
      stats:{ hp:200, magicBoost:80, magicAcc:30 } },
    { id:2204, name:"Fenris's Pants",         icon:"2204.png", grade:"eternal",
      slot:"pants",     armorType:"cloth", set:"fenris",
      stats:{ hp:420, magicBoost:100, magicAcc:25 } },
    { id:2205, name:"Fenris's Shoes",         icon:"2205.png", grade:"eternal",
      slot:"boots",     armorType:"cloth", set:"fenris",
      stats:{ hp:190, magicBoost:60 } },
    { id:2206, name:"Fenris's Shoulders",     icon:"2206.png", grade:"eternal",
      slot:"shoulders", armorType:"cloth", set:"fenris",
      stats:{ hp:230, magicBoost:70, magicCrit:20 } },
    // Chain
    { id:2301, name:"Tahabata's Chain Helmet",   icon:"2301.png", grade:"eternal",
      slot:"helmet",    armorType:"chain", set:"tahabata_chain",
      stats:{ hp:340, magicBoost:40, block:30 } },
    { id:2302, name:"Tahabata's Haubergeon",     icon:"2302.png", grade:"eternal",
      slot:"chest",     armorType:"chain", set:"tahabata_chain",
      stats:{ hp:660, magicBoost:80, block:50 } },
    { id:2303, name:"Tahabata's Chain Gloves",   icon:"2303.png", grade:"eternal",
      slot:"gloves",    armorType:"chain", set:"tahabata_chain",
      stats:{ hp:260, magicBoost:50, healingBoost:10 } },
    { id:2304, name:"Tahabata's Chain Pants",    icon:"2304.png", grade:"eternal",
      slot:"pants",     armorType:"chain", set:"tahabata_chain",
      stats:{ hp:540, magicBoost:70, block:40 } },
    { id:2305, name:"Tahabata's Chain Boots",    icon:"2305.png", grade:"eternal",
      slot:"boots",     armorType:"chain", set:"tahabata_chain",
      stats:{ hp:240, magicBoost:40 } },
    { id:2306, name:"Tahabata's Chain Pauldrons",icon:"2306.png", grade:"eternal",
      slot:"shoulders", armorType:"chain", set:"tahabata_chain",
      stats:{ hp:290, magicBoost:55, block:25 } }
  ],
  accessories: [
    { id:5001, name:"Tahabata's Necklace",  icon:"5001.png", grade:"eternal",
      slot:"necklace", set:"tahabata_acc", stats:{ rAtk:18, rCrit:25, hp:100 } },
    { id:5002, name:"Tahabata's Ring",      icon:"5002.png", grade:"eternal",
      slot:"ring",     set:"tahabata_acc", stats:{ rAtk:10, rCrit:30, hp:80 } },
    { id:5003, name:"Tahabata's Earring",   icon:"5003.png", grade:"eternal",
      slot:"earring",  set:"tahabata_acc", stats:{ hp:200, rCrit:20, evasion:20 } },
    { id:5004, name:"Tahabata's Belt",      icon:"5004.png", grade:"eternal",
      slot:"belt",     set:"tahabata_acc", stats:{ hp:240, physDef:50, block:35 } },
    { id:5101, name:"Miragent's Necklace",  icon:"5101.png", grade:"fabled",
      slot:"necklace", set:"miragent_acc", stats:{ rCrit:45, rAcc:30 } },
    { id:5102, name:"Miragent's Ring",      icon:"5102.png", grade:"fabled",
      slot:"ring",     set:"miragent_acc", stats:{ rCrit:50, rAcc:25 } },
    { id:5103, name:"Miragent's Earring",   icon:"5103.png", grade:"fabled",
      slot:"earring",  set:"miragent_acc", stats:{ hp:180, rCrit:35 } },
    { id:5104, name:"Miragent's Belt",      icon:"5104.png", grade:"fabled",
      slot:"belt",     set:"miragent_acc", stats:{ evasion:55, rAcc:20 } },
    { id:5201, name:"Fenris's Necklace",    icon:"5201.png", grade:"eternal",
      slot:"necklace", set:"fenris_acc",   stats:{ magicBoost:55, magicCrit:35 } },
    { id:5202, name:"Fenris's Ring",        icon:"5202.png", grade:"eternal",
      slot:"ring",     set:"fenris_acc",   stats:{ magicBoost:50, magicAcc:30 } },
    { id:5203, name:"Fenris's Earring",     icon:"5203.png", grade:"eternal",
      slot:"earring",  set:"fenris_acc",   stats:{ magicBoost:40, magicCrit:30 } },
    { id:5204, name:"Fenris's Belt",        icon:"5204.png", grade:"eternal",
      slot:"belt",     set:"fenris_acc",   stats:{ magicBoost:60, hp:150 } }
  ]
};

/* ── SET BONUSES ────────────────────────────────────────────── */
const SET_BONUSES = [
  {
    id:"tahabata", name:"Tahabata Set",
    items:[2001,2002,2003,2004,2005,2006],
    bonuses:[
      { pieces:2, stats:{ rAtk:15, rCrit:20 },              label:"2pc: +15 Atk, +20 Crit" },
      { pieces:4, stats:{ hp:300, block:80 },                label:"4pc: +300 HP, +80 Block" },
      { pieces:6, stats:{ rAtk:40, physDef:120, block:120 }, label:"6pc: Full Set Bonus" }
    ]
  },
  {
    id:"miragent", name:"Miragent Set",
    items:[2101,2102,2103,2104,2105,2106],
    bonuses:[
      { pieces:2, stats:{ rCrit:30, evasion:30 },            label:"2pc: +30 Crit, +30 Evasion" },
      { pieces:4, stats:{ rCrit:50, evasion:60 },            label:"4pc: +50 Crit, +60 Evasion" },
      { pieces:6, stats:{ rCrit:80, evasion:100, rAtk:25 },  label:"6pc: Full Set Bonus" }
    ]
  },
  {
    id:"fenris", name:"Fenris Set",
    items:[2201,2202,2203,2204,2205,2206],
    bonuses:[
      { pieces:2, stats:{ magicBoost:60,  magicCrit:25 },               label:"2pc: +60 MBoost, +25 MCrit" },
      { pieces:4, stats:{ magicBoost:120, magicCrit:50 },               label:"4pc: +120 MBoost, +50 MCrit" },
      { pieces:6, stats:{ magicBoost:200, magicCrit:80, magicAcc:60 },  label:"6pc: Full Set Bonus" }
    ]
  },
  {
    id:"tahabata_acc", name:"Tahabata Accessories",
    items:[5001,5002,5003,5004],
    bonuses:[
      { pieces:2, stats:{ rCrit:20, hp:100 },                label:"2pc: +20 Crit, +100 HP" },
      { pieces:4, stats:{ rCrit:40, hp:250, rAtk:20 },       label:"4pc: Full Accessory Bonus" }
    ]
  }
];
