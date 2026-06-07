/* ============================================================
   data.js — All static game data
   ============================================================ */

const CLASSES = [
  { id: "gladiator",   name: "Gladiator" },
  { id: "templar",     name: "Templar" },
  { id: "assassin",    name: "Assassin" },
  { id: "ranger",      name: "Ranger" },
  { id: "sorcerer",    name: "Sorcerer" },
  { id: "spiritmaster",name: "Spiritmaster" },
  { id: "cleric",      name: "Cleric" },
  { id: "chanter",     name: "Chanter" },
  { id: "gunslinger",  name: "Gunslinger" },
  { id: "songweaver",  name: "Songweaver" },
  { id: "aethertech",  name: "Aethertech" }
];

const ARMOR_TYPES = {
  gladiator: "plate", templar: "plate",
  assassin: "leather", ranger: "leather", gunslinger: "leather",
  sorcerer: "cloth", spiritmaster: "cloth", songweaver: "cloth",
  cleric: "chain", chanter: "chain",
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
  aethertech:   ["cannon"]
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

const BASE_STATS = {
  gladiator: {
    hp: 10671, mp: 5021,
    atkSpeed: 1.425, castingSpeed: 0.95, speed: 6.3, flightSpeed: 9.0, flightTime: 60,
    atkRange: 0, enmityBoost: "2.0%", concentration: 0, healingBoost: 0,
    pvpAtk: "1.0%", pvpDef: "1.0%", pveAtk: "1.0%", pveDef: "1.0%",
    rAtk: 55, rAcc: 810, rCrit: 2, lAtk: 0, lAcc: 0, lCrit: 0,
    magicBoost: 0, magicAcc: 996, magicCrit: 50,
    power: 115, hpStat: 115, precision: 100, agility: 100, knowledge: 90, will: 90,
    physDef: 0, block: 1028, dmgReduction: "0.0%", reduceMax: 0,
    parry: 1008, evasion: 928, strikeRes: 120, strikeFort: 0,
    magRes: 0, magOffset: 0, spellRes: 0, spellFort: 0,
    fireDef: 0, earthDef: 0, windDef: 0, waterDef: 0,
    stumbleResPen: 200, naturalHealing: 20
  },
  templar: {
    hp: 11500, mp: 4800,
    atkSpeed: 1.4, castingSpeed: 0.9, speed: 6.0, flightSpeed: 9.0, flightTime: 60,
    atkRange: 0, enmityBoost: "5.0%", concentration: 0, healingBoost: 0,
    pvpAtk: "1.0%", pvpDef: "1.0%", pveAtk: "1.0%", pveDef: "1.0%",
    rAtk: 45, rAcc: 780, rCrit: 0, lAtk: 0, lAcc: 0, lCrit: 0,
    magicBoost: 0, magicAcc: 900, magicCrit: 30,
    power: 120, hpStat: 125, precision: 100, agility: 95, knowledge: 85, will: 100,
    physDef: 0, block: 1200, dmgReduction: "0.0%", reduceMax: 0,
    parry: 1100, evasion: 850, strikeRes: 140, strikeFort: 0,
    magRes: 0, magOffset: 0, spellRes: 0, spellFort: 0,
    fireDef: 0, earthDef: 0, windDef: 0, waterDef: 0,
    stumbleResPen: 200, naturalHealing: 20
  },
  assassin: {
    hp: 9200, mp: 4600,
    atkSpeed: 1.5, castingSpeed: 1.0, speed: 7.0, flightSpeed: 9.5, flightTime: 60,
    atkRange: 0, enmityBoost: "0%", concentration: 0, healingBoost: 0,
    pvpAtk: "1.0%", pvpDef: "1.0%", pveAtk: "1.0%", pveDef: "1.0%",
    rAtk: 85, rAcc: 880, rCrit: 30, lAtk: 65, lAcc: 860, lCrit: 25,
    magicBoost: 0, magicAcc: 950, magicCrit: 50,
    power: 105, hpStat: 100, precision: 110, agility: 115, knowledge: 85, will: 85,
    physDef: 0, block: 0, dmgReduction: "0.0%", reduceMax: 0,
    parry: 0, evasion: 1100, strikeRes: 100, strikeFort: 0,
    magRes: 0, magOffset: 0, spellRes: 0, spellFort: 0,
    fireDef: 0, earthDef: 0, windDef: 0, waterDef: 0,
    stumbleResPen: 200, naturalHealing: 20
  },
  ranger: {
    hp: 9400, mp: 4700,
    atkSpeed: 1.6, castingSpeed: 1.0, speed: 7.0, flightSpeed: 9.5, flightTime: 60,
    atkRange: 0, enmityBoost: "0%", concentration: 0, healingBoost: 0,
    pvpAtk: "1.0%", pvpDef: "1.0%", pveAtk: "1.0%", pveDef: "1.0%",
    rAtk: 78, rAcc: 900, rCrit: 20, lAtk: 0, lAcc: 0, lCrit: 0,
    magicBoost: 0, magicAcc: 940, magicCrit: 45,
    power: 100, hpStat: 100, precision: 115, agility: 112, knowledge: 88, will: 90,
    physDef: 0, block: 0, dmgReduction: "0.0%", reduceMax: 0,
    parry: 0, evasion: 1050, strikeRes: 90, strikeFort: 0,
    magRes: 0, magOffset: 0, spellRes: 0, spellFort: 0,
    fireDef: 0, earthDef: 0, windDef: 0, waterDef: 0,
    stumbleResPen: 200, naturalHealing: 20
  },
  sorcerer: {
    hp: 8100, mp: 6500,
    atkSpeed: 1.3, castingSpeed: 1.1, speed: 6.8, flightSpeed: 9.5, flightTime: 60,
    atkRange: 0, enmityBoost: "0%", concentration: 0, healingBoost: 0,
    pvpAtk: "1.0%", pvpDef: "1.0%", pveAtk: "1.0%", pveDef: "1.0%",
    rAtk: 30, rAcc: 700, rCrit: 0, lAtk: 0, lAcc: 0, lCrit: 0,
    magicBoost: 250, magicAcc: 1100, magicCrit: 80,
    power: 90, hpStat: 90, precision: 92, agility: 90, knowledge: 130, will: 125,
    physDef: 0, block: 0, dmgReduction: "0.0%", reduceMax: 0,
    parry: 0, evasion: 900, strikeRes: 70, strikeFort: 0,
    magRes: 0, magOffset: 0, spellRes: 0, spellFort: 0,
    fireDef: 0, earthDef: 0, windDef: 0, waterDef: 0,
    stumbleResPen: 200, naturalHealing: 20
  },
  cleric: {
    hp: 9800, mp: 6200,
    atkSpeed: 1.35, castingSpeed: 1.05, speed: 6.5, flightSpeed: 9.0, flightTime: 60,
    atkRange: 0, enmityBoost: "0%", concentration: 0, healingBoost: 100,
    pvpAtk: "1.0%", pvpDef: "1.0%", pveAtk: "1.0%", pveDef: "1.0%",
    rAtk: 40, rAcc: 750, rCrit: 0, lAtk: 0, lAcc: 0, lCrit: 0,
    magicBoost: 180, magicAcc: 1050, magicCrit: 60,
    power: 100, hpStat: 110, precision: 95, agility: 95, knowledge: 120, will: 130,
    physDef: 0, block: 0, dmgReduction: "0.0%", reduceMax: 0,
    parry: 0, evasion: 920, strikeRes: 80, strikeFort: 0,
    magRes: 0, magOffset: 0, spellRes: 0, spellFort: 0,
    fireDef: 0, earthDef: 0, windDef: 0, waterDef: 0,
    stumbleResPen: 200, naturalHealing: 20
  }
};
// Fill remaining classes with sorcerer base
["spiritmaster","chanter","gunslinger","songweaver","aethertech"].forEach(c => {
  if (!BASE_STATS[c]) BASE_STATS[c] = { ...BASE_STATS.sorcerer };
});

/* ============================================================
   STAT DISPLAY CONFIG — what's shown in which section
   ============================================================ */
const STAT_SECTIONS = {
  general: {
    title: "General",
    keys: ["hp","mp","atkRange","atkSpeed","castingSpeed","speed","flightSpeed","flightTime","enmityBoost","concentration","healingBoost"]
  },
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
  hp: "HP", mp: "MP", atkRange: "Atk Range", atkSpeed: "Atk Speed",
  castingSpeed: "Casting Speed", speed: "Speed", flightSpeed: "Flight Speed",
  flightTime: "Flight Time", enmityBoost: "Enmity Boost", concentration: "Concentration",
  healingBoost: "Healing Boost",
  pvpAtk: "PvP Attack", pvpDef: "PvP Defense", pveAtk: "PvE Attack", pveDef: "PvE Defense",
  rAtk: "[R] Attack", rAcc: "[R] Accuracy", rCrit: "[R] Crit Strike",
  lAtk: "[L] Attack", lAcc: "[L] Accuracy", lCrit: "[L] Crit Strike",
  magicBoost: "Magic Boost", magicAcc: "Magic Accuracy", magicCrit: "Magic Crit",
  power: "Power", hpStat: "HP (Stat)", precision: "Precision", agility: "Agility",
  knowledge: "Knowledge", will: "Will",
  physDef: "Physical Def", block: "Block", dmgReduction: "Damage Reduction",
  reduceMax: "Reduce Max", parry: "Parry", evasion: "Evasion",
  strikeRes: "Strike Resist", strikeFort: "Strike Fortitude",
  magRes: "Magic Resistance", magOffset: "Magic Offset",
  spellRes: "Spell Resist", spellFort: "Spell Fortitude",
  fireDef: "Fire Defense", earthDef: "Earth Defense",
  windDef: "Wind Defense", waterDef: "Water Defense",
  stumbleResPen: "Stumble Res. Pen.", naturalHealing: "Natural Healing",
  attack: "Attack", crit: "Crit Strike", accuracy: "Accuracy",
  physicalDefence: "Physical Def", magicalResist: "Magic Resist"
};

const ITEM_GRADE_COLORS = {
  common: "grade-common", rare: "grade-rare", legend: "grade-legend",
  unique: "grade-unique", epic: "grade-epic"
};

/* ============================================================
   ITEMS
   ============================================================ */
const ITEMS = {
  weapons: [
    { id:1001, name:"Tahabata's Greatsword", icon:"1001.png", grade:"legend",
      class:["gladiator","templar"], slot:"weapon",
      stats:{ rAtk:245, rCrit:50, rAcc:0 } },
    { id:1002, name:"Arena Greatsword", icon:"1002.png", grade:"unique",
      class:["gladiator","templar"], slot:"weapon",
      stats:{ rAtk:265, rCrit:20, rAcc:0 } },
    { id:1003, name:"Inggison Polearm", icon:"1003.png", grade:"rare",
      class:["gladiator"], slot:"weapon",
      stats:{ rAtk:210, rCrit:30, rAcc:0 } },
    { id:1101, name:"Tahabata's Dagger", icon:"1101.png", grade:"legend",
      class:["assassin"], slot:"weapon",
      stats:{ rAtk:195, rCrit:80, rAcc:20 } },
    { id:1102, name:"Miragent Dagger", icon:"1102.png", grade:"unique",
      class:["assassin"], slot:"weapon",
      stats:{ rAtk:185, rCrit:90, rAcc:10 } },
    { id:1201, name:"Tahabata's Bow", icon:"1201.png", grade:"legend",
      class:["ranger"], slot:"weapon",
      stats:{ rAtk:260, rCrit:35, rAcc:10 } },
    { id:1301, name:"Tahabata's Orb", icon:"1301.png", grade:"legend",
      class:["sorcerer","spiritmaster"], slot:"weapon",
      stats:{ magicBoost:210, magicAcc:50, magicCrit:30 } },
    { id:1401, name:"Tahabata's Mace", icon:"1401.png", grade:"legend",
      class:["cleric","chanter"], slot:"weapon",
      stats:{ rAtk:160, magicBoost:150, healingBoost:20 } },
    { id:1501, name:"Arena Pistol", icon:"1501.png", grade:"unique",
      class:["gunslinger"], slot:"weapon",
      stats:{ rAtk:230, rCrit:40, rAcc:0 } },
    { id:1601, name:"Tahabata's Harp", icon:"1601.png", grade:"legend",
      class:["songweaver"], slot:"weapon",
      stats:{ magicBoost:180, rAtk:90, rAcc:30 } },
    { id:1701, name:"Aethertech Cannon", icon:"1701.png", grade:"unique",
      class:["aethertech"], slot:"weapon",
      stats:{ rAtk:280, rAcc:10 } }
  ],
  armor: [
    // Plate sets
    { id:2001, name:"Tahabata's Helmet",      icon:"2001.png", grade:"legend", slot:"helmet",
      armorType:"plate", set:"tahabata",
      stats:{ hp:380, block:55, parry:40 } },
    { id:2002, name:"Tahabata's Breastplate", icon:"2002.png", grade:"legend", slot:"chest",
      armorType:"plate", set:"tahabata",
      stats:{ hp:720, physDef:180, block:65 } },
    { id:2003, name:"Tahabata's Gauntlets",   icon:"2003.png", grade:"legend", slot:"gloves",
      armorType:"plate", set:"tahabata",
      stats:{ hp:280, rCrit:30, rAtk:15 } },
    { id:2004, name:"Tahabata's Greaves",     icon:"2004.png", grade:"legend", slot:"pants",
      armorType:"plate", set:"tahabata",
      stats:{ hp:580, physDef:140, block:40 } },
    { id:2005, name:"Tahabata's Sabatons",    icon:"2005.png", grade:"legend", slot:"boots",
      armorType:"plate", set:"tahabata",
      stats:{ hp:260, evasion:40, speed:0.2 } },
    { id:2006, name:"Tahabata's Pauldrons",   icon:"2006.png", grade:"legend", slot:"shoulders",
      armorType:"plate", set:"tahabata",
      stats:{ hp:310, physDef:90, block:30 } },
    // Leather sets
    { id:2101, name:"Miragent's Hood",        icon:"2101.png", grade:"unique", slot:"helmet",
      armorType:"leather", set:"miragent",
      stats:{ hp:310, rCrit:40, evasion:35 } },
    { id:2102, name:"Miragent's Jerkin",      icon:"2102.png", grade:"unique", slot:"chest",
      armorType:"leather", set:"miragent",
      stats:{ hp:600, rCrit:50, evasion:60 } },
    { id:2103, name:"Miragent's Gloves",      icon:"2103.png", grade:"unique", slot:"gloves",
      armorType:"leather", set:"miragent",
      stats:{ hp:240, rCrit:45, rAcc:20 } },
    { id:2104, name:"Miragent's Leggings",    icon:"2104.png", grade:"unique", slot:"pants",
      armorType:"leather", set:"miragent",
      stats:{ hp:490, evasion:55, rAcc:25 } },
    { id:2105, name:"Miragent's Shoes",       icon:"2105.png", grade:"unique", slot:"boots",
      armorType:"leather", set:"miragent",
      stats:{ hp:220, evasion:45, speed:0.3 } },
    { id:2106, name:"Miragent's Pauldrons",   icon:"2106.png", grade:"unique", slot:"shoulders",
      armorType:"leather", set:"miragent",
      stats:{ hp:260, rCrit:35, evasion:30 } },
    // Cloth sets
    { id:2201, name:"Fenris's Hat",           icon:"2201.png", grade:"legend", slot:"helmet",
      armorType:"cloth", set:"fenris",
      stats:{ hp:260, magicBoost:70, magicCrit:25 } },
    { id:2202, name:"Fenris's Tunic",         icon:"2202.png", grade:"legend", slot:"chest",
      armorType:"cloth", set:"fenris",
      stats:{ hp:520, magicBoost:120, magicCrit:30 } },
    { id:2203, name:"Fenris's Gloves",        icon:"2203.png", grade:"legend", slot:"gloves",
      armorType:"cloth", set:"fenris",
      stats:{ hp:200, magicBoost:80, magicAcc:30 } },
    { id:2204, name:"Fenris's Pants",         icon:"2204.png", grade:"legend", slot:"pants",
      armorType:"cloth", set:"fenris",
      stats:{ hp:420, magicBoost:100, magicAcc:25 } },
    { id:2205, name:"Fenris's Shoes",         icon:"2205.png", grade:"legend", slot:"boots",
      armorType:"cloth", set:"fenris",
      stats:{ hp:190, magicBoost:60, speed:0.2 } },
    { id:2206, name:"Fenris's Shoulders",     icon:"2206.png", grade:"legend", slot:"shoulders",
      armorType:"cloth", set:"fenris",
      stats:{ hp:230, magicBoost:70, magicCrit:20 } },
    // Chain sets
    { id:2301, name:"Tahabata's Headgear",    icon:"2301.png", grade:"legend", slot:"helmet",
      armorType:"chain", set:"tahabata_chain",
      stats:{ hp:340, magicBoost:40, block:30 } },
    { id:2302, name:"Tahabata's Haubergeon",  icon:"2302.png", grade:"legend", slot:"chest",
      armorType:"chain", set:"tahabata_chain",
      stats:{ hp:660, magicBoost:80, block:50 } },
    { id:2303, name:"Tahabata's Chain Gloves",icon:"2303.png", grade:"legend", slot:"gloves",
      armorType:"chain", set:"tahabata_chain",
      stats:{ hp:260, magicBoost:50, healingBoost:10 } },
    { id:2304, name:"Tahabata's Chain Pants", icon:"2304.png", grade:"legend", slot:"pants",
      armorType:"chain", set:"tahabata_chain",
      stats:{ hp:540, magicBoost:70, block:40 } },
    { id:2305, name:"Tahabata's Chain Boots", icon:"2305.png", grade:"legend", slot:"boots",
      armorType:"chain", set:"tahabata_chain",
      stats:{ hp:240, magicBoost:40, speed:0.2 } },
    { id:2306, name:"Tahabata's Chain Pauldrons",icon:"2306.png", grade:"legend", slot:"shoulders",
      armorType:"chain", set:"tahabata_chain",
      stats:{ hp:290, magicBoost:55, block:25 } }
  ],
  accessories: [
    { id:5001, name:"Tahabata's Necklace",  icon:"5001.png", grade:"legend", slot:"necklace",
      set:"tahabata_acc", stats:{ rAtk:18, rCrit:25, hp:100 } },
    { id:5002, name:"Tahabata's Ring",      icon:"5002.png", grade:"legend", slot:"ring",
      set:"tahabata_acc", stats:{ rAtk:10, rCrit:30, hp:80 } },
    { id:5003, name:"Tahabata's Earring",   icon:"5003.png", grade:"legend", slot:"earring",
      set:"tahabata_acc", stats:{ hp:200, rCrit:20, evasion:20 } },
    { id:5004, name:"Tahabata's Belt",      icon:"5004.png", grade:"legend", slot:"belt",
      set:"tahabata_acc", stats:{ hp:240, physDef:50, block:35 } },
    { id:5101, name:"Miragent's Necklace",  icon:"5101.png", grade:"unique", slot:"necklace",
      set:"miragent_acc", stats:{ rCrit:45, rAcc:30 } },
    { id:5102, name:"Miragent's Ring",      icon:"5102.png", grade:"unique", slot:"ring",
      set:"miragent_acc", stats:{ rCrit:50, rAcc:25 } },
    { id:5103, name:"Miragent's Earring",   icon:"5103.png", grade:"unique", slot:"earring",
      set:"miragent_acc", stats:{ hp:180, rCrit:35 } },
    { id:5104, name:"Miragent's Belt",      icon:"5104.png", grade:"unique", slot:"belt",
      set:"miragent_acc", stats:{ evasion:55, rAcc:20 } },
    { id:5201, name:"Fenris's Necklace",    icon:"5201.png", grade:"legend", slot:"necklace",
      set:"fenris_acc", stats:{ magicBoost:55, magicCrit:35 } },
    { id:5202, name:"Fenris's Ring",        icon:"5202.png", grade:"legend", slot:"ring",
      set:"fenris_acc", stats:{ magicBoost:50, magicAcc:30 } },
    { id:5203, name:"Fenris's Earring",     icon:"5203.png", grade:"legend", slot:"earring",
      set:"fenris_acc", stats:{ magicBoost:40, magicCrit:30 } },
    { id:5204, name:"Fenris's Belt",        icon:"5204.png", grade:"legend", slot:"belt",
      set:"fenris_acc", stats:{ magicBoost:60, hp:150 } }
  ]
};

const SET_BONUSES = [
  {
    id: "tahabata", name: "Tahabata Set",
    items: [2001,2002,2003,2004,2005,2006],
    bonuses: [
      { pieces: 2, stats: { rAtk:15, rCrit:20 }, label: "2pc: +15 Atk, +20 Crit" },
      { pieces: 4, stats: { hp:300, block:80 },   label: "4pc: +300 HP, +80 Block" },
      { pieces: 6, stats: { rAtk:40, physDef:120, block:120 }, label: "6pc: Full Set Bonus" }
    ]
  },
  {
    id: "miragent", name: "Miragent Set",
    items: [2101,2102,2103,2104,2105,2106],
    bonuses: [
      { pieces: 2, stats: { rCrit:30, evasion:30 }, label: "2pc: +30 Crit, +30 Evasion" },
      { pieces: 4, stats: { rCrit:50, evasion:60 }, label: "4pc: +50 Crit, +60 Evasion" },
      { pieces: 6, stats: { rCrit:80, evasion:100, rAtk:25 }, label: "6pc: Full Set Bonus" }
    ]
  },
  {
    id: "fenris", name: "Fenris Set",
    items: [2201,2202,2203,2204,2205,2206],
    bonuses: [
      { pieces: 2, stats: { magicBoost:60, magicCrit:25 }, label: "2pc: +60 MBoost, +25 MCrit" },
      { pieces: 4, stats: { magicBoost:120, magicCrit:50 }, label: "4pc: +120 MBoost, +50 MCrit" },
      { pieces: 6, stats: { magicBoost:200, magicCrit:80, magicAcc:60 }, label: "6pc: Full Set Bonus" }
    ]
  },
  {
    id: "tahabata_acc", name: "Tahabata Accessories",
    items: [5001,5002,5003,5004],
    bonuses: [
      { pieces: 2, stats: { rCrit:20, hp:100 }, label: "2pc: +20 Crit, +100 HP" },
      { pieces: 4, stats: { rCrit:40, hp:250, rAtk:20 }, label: "4pc: Full Accessory Bonus" }
    ]
  }
];
