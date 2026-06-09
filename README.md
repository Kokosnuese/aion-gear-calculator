# Aion Gear Calculator — 4.x EU

A static gear calculator for Aion 4.x EU, deployable as a GitHub Page.

## Features

- **Equipment slots** — Equip weapons, armor and accessories per class
- **Stat calculator** — Live stat totals with gear, set bonuses and skill amplifications
- **Multiple sets** — Create unlimited sets and switch between them instantly
- **Set comparison** — Side-by-side stat diff between any two sets (green = better, red = worse)
- **Skill amplification** — Toggle passive skills per class to include in calculations
- **Share builds** — Encode full build into a URL hash for sharing
- **Persistent state** — Saves to `localStorage` automatically

## Deployment to GitHub Pages

1. Create a new GitHub repository (e.g. `aion-gear-calc`)
2. Push this folder as the root of the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/aion-gear-calc.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repository
4. Set **Source** to `Deploy from a branch` → `main` → `/ (root)`
5. Save — your site will be live at `https://YOUR_USERNAME.github.io/aion-gear-calc/`

## Project Structure

```
aion-gear-calculator/
├── index.html              ← Entry point
├── css/
│   └── style.css           ← All styles
├── js/
│   ├── data.js             ← All game data (classes, items, skills, sets)
│   ├── engine.js           ← Stat calculation logic
│   ├── ui.js               ← DOM rendering (slots, stats, comparison, tooltip)
│   └── app.js              ← Application controller & event binding
└── assets/
    ├── bg/                 ← Background images (.webp)
    ├── ui/                 ← Slot icons, class emblems, character sprite
    └── icons/              ← Item icons (add as <item_id>.png)
```

## Adding Items

All items are defined in `js/data.js` inside the `ITEMS` constant.
Each item needs:

```js
{ id: 9001, name: "Item Name", icon: "9001.png", grade: "eternal",
  class: ["gladiator"], slot: "weapon", weaponType: "greatsword",
  stats: { rAtk: 300, rCrit: 80 } }
```

Place the item icon at `assets/icons/9001.png`.

**Grades:** `common`, `rare`, `heroic`, `fabled` (legend), `eternal` (unique), `mythic` (epic)

## Adding Skills

Skills are in `CLASS_SKILLS` in `data.js`:

```js
gladiator: [
  { id: "gl_16", name: "New Skill", stats: { rAtk: 60, rCrit: 40 } },
  ...
]
```

## Stat Keys Reference

| Key | Label |
|---|---|
| `hp` / `mp` | HP / MP |
| `rAtk` / `rAcc` / `rCrit` | Right-hand Attack / Accuracy / Crit |
| `lAtk` / `lAcc` / `lCrit` | Left-hand (dual wield) |
| `magicBoost` / `magicAcc` / `magicCrit` | Magic stats |
| `physDef` / `block` / `parry` / `evasion` | Defense stats |
| `strikeRes` / `strikeFort` | Strike Resist / Fortitude |
| `magRes` / `magOffset` / `spellRes` / `spellFort` | Magic defense |
| `fireDef` / `earthDef` / `windDef` / `waterDef` | Elemental defense |
| `atkSpeed` / `castingSpeed` / `speed` | Speed stats |
| `pvpAtk` / `pvpDef` / `pveAtk` / `pveDef` | PvP/PvE modifiers |
