/* ============================================================
   ui.js — DOM rendering helpers
   ============================================================ */

const LEFT_SLOTS  = ['helmet','shoulders','chest','gloves','pants','boots'];
const RIGHT_SLOTS = ['necklace','earring1','earring2','ring1','ring2','belt','weapon','subWeapon'];

// ---- SLOTS --------------------------------------------------

function buildEquipmentSlots(equipment) {
  const left  = document.getElementById('leftGearColumn');
  const right = document.getElementById('rightGearColumn');
  left.innerHTML = '';
  right.innerHTML = '';
  LEFT_SLOTS.forEach(slot  => left.appendChild(createSlotEl(slot, equipment[slot])));
  RIGHT_SLOTS.forEach(slot => right.appendChild(createSlotEl(slot, equipment[slot])));
}

function createSlotEl(slot, item) {
  const el = document.createElement('div');
  el.className = 'equipment-slot' + (item ? ' has-item' : '');
  el.dataset.slot = slot;

  const icon = SLOT_ICONS[slot] || '';
  const label = SLOT_LABELS[slot] || slot;

  el.innerHTML = `
    <div class="slot-icon">
      <img src="${icon}" alt="${label}">
    </div>
    <div class="slot-content">
      <div class="slot-label">${label}</div>
      <div class="slot-item ${item ? 'has-item ' + gradeClass(item) : ''}">${item ? item.name : 'Empty'}</div>
    </div>
    <button class="slot-clear" data-slot="${slot}" title="Remove item">✕</button>
  `;

  el.addEventListener('click', (e) => {
    if (e.target.closest('.slot-clear')) {
      e.stopPropagation();
      App.clearSlot(slot);
      return;
    }
    App.openModal(slot);
  });

  // Tooltip on hover
  if (item) {
    el.addEventListener('mouseenter', (e) => showTooltip(item, e));
    el.addEventListener('mousemove',  (e) => moveTooltip(e));
    el.addEventListener('mouseleave', hideTooltip);
  }

  return el;
}

function updateSlotEl(slot, item) {
  const existing = document.querySelector(`[data-slot="${slot}"]`);
  if (!existing) return;
  const newEl = createSlotEl(slot, item);
  existing.parentNode.replaceChild(newEl, existing);
}

function gradeClass(item) {
  return item && item.grade ? 'grade-' + item.grade : '';
}

// ---- STATS PANEL --------------------------------------------

function renderStats(stats, baseStats) {
  Object.entries(STAT_SECTIONS).forEach(([sectionKey, section]) => {
    const container = document.getElementById('stats' + capitalize(sectionKey));
    if (!container) return;
    container.innerHTML = '';

    const title = document.createElement('div');
    title.className = 'stats-section-title';
    title.textContent = section.title;
    container.appendChild(title);

    section.keys.forEach(key => {
      const val = stats[key];
      if (val === undefined) return;
      const row = document.createElement('div');
      row.className = 'stat-row';

      const base = baseStats ? baseStats[key] : undefined;
      const bonus = (typeof val === 'number' && typeof base === 'number') ? val - base : 0;
      const formattedVal = formatStatValue(key, val);

      let valueHtml = `<span class="stat-value${bonus > 0 ? ' buffed' : ''}">${formattedVal}</span>`;

      row.innerHTML = `<span class="stat-name">${STAT_NAMES[key] || key}</span>${valueHtml}`;
      container.appendChild(row);
    });
  });
}

// ---- SET BONUS DISPLAY -------------------------------------

function renderSetBonuses(equipment) {
  const area = document.getElementById('setBonusArea');
  if (!area) return;
  area.innerHTML = '';

  const bonuses = computeSetBonuses(equipment);
  if (bonuses.length === 0) return;

  // Group by setId, show highest achieved
  const grouped = {};
  bonuses.forEach(b => {
    if (!grouped[b.setId]) grouped[b.setId] = { name: b.name, bonuses: [] };
    grouped[b.setId].bonuses.push(b);
  });

  Object.values(grouped).forEach(group => {
    const achieved = group.bonuses.filter(b => b.active);
    if (achieved.length === 0) {
      // Show greyed out minimum
      const b = group.bonuses[0];
      const el = document.createElement('div');
      el.className = 'set-bonus-item';
      el.innerHTML = `<span class="set-bonus-name">${group.name}</span>
        <span class="set-bonus-pieces"> (${b.piecesEquipped}/${b.piecesRequired})</span>`;
      area.appendChild(el);
    } else {
      // Show the highest active
      const last = achieved[achieved.length - 1];
      const el = document.createElement('div');
      el.className = 'set-bonus-item set-bonus-active';
      el.innerHTML = `<div class="set-bonus-name">${group.name}</div>
        <div class="set-bonus-pieces">${last.label}</div>`;
      area.appendChild(el);
    }
  });
}

// ---- MODAL --------------------------------------------------

function renderItemList(items, slot) {
  const results = document.getElementById('itemResults');
  results.innerHTML = '';

  if (items.length === 0) {
    results.innerHTML = '<div class="modal-empty">No items found for this slot.</div>';
    return;
  }

  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-row';

    const statsPreview = Object.entries(item.stats || {})
      .slice(0, 3)
      .map(([k,v]) => `${STAT_NAMES[k] || k}: +${v}`)
      .join(' · ');

    const gradeBadge = item.grade
      ? `<span class="item-grade-badge grade-badge-${item.grade}">${item.grade}</span>`
      : '';

    row.innerHTML = `
      <div class="item-icon">
        <img src="assets/icons/${item.icon}" alt="${item.name}"
          onerror="this.parentElement.innerHTML='<span style=\\"color:#555;font-size:18px;\\">?</span>'">
      </div>
      <div class="item-info">
        <div class="item-name ${gradeClass(item)}">${item.name}</div>
        <div class="item-stats-preview">${statsPreview}</div>
      </div>
      ${gradeBadge}
    `;

    row.addEventListener('mouseenter', (e) => showTooltip(item, e));
    row.addEventListener('mousemove',  (e) => moveTooltip(e));
    row.addEventListener('mouseleave', hideTooltip);

    row.addEventListener('click', () => {
      App.equipItem(slot, item);
      App.closeModal();
    });

    results.appendChild(row);
  });
}

// ---- TOOLTIP ------------------------------------------------

function showTooltip(item, e) {
  const tt = document.getElementById('tooltip');
  const statsHtml = Object.entries(item.stats || {})
    .map(([k,v]) => `<div class="tt-stat"><span>${STAT_NAMES[k]||k}</span><span>+${typeof v==='number'?v.toLocaleString():v}</span></div>`)
    .join('');

  const gradeColor = {
    common:'var(--grade-common)', rare:'var(--grade-rare)', legend:'var(--grade-legend)',
    unique:'var(--grade-unique)', epic:'var(--grade-epic)'
  }[item.grade] || 'var(--text-bright)';

  tt.innerHTML = `
    <div class="tt-name" style="color:${gradeColor}">${item.name}</div>
    ${item.grade ? `<div class="tt-type">${capitalize(item.grade)}</div>` : ''}
    <hr class="tt-divider">
    ${statsHtml}
  `;

  tt.style.display = 'block';
  moveTooltip(e);
}

function moveTooltip(e) {
  const tt = document.getElementById('tooltip');
  const x = e.clientX + 16;
  const y = e.clientY - 10;
  const maxX = window.innerWidth  - tt.offsetWidth  - 12;
  const maxY = window.innerHeight - tt.offsetHeight - 12;
  tt.style.left = Math.min(x, maxX) + 'px';
  tt.style.top  = Math.min(y, maxY) + 'px';
}

function hideTooltip() {
  document.getElementById('tooltip').style.display = 'none';
}

// ---- SETS TAB -----------------------------------------------

function renderSetTabs(sets, activeIndex) {
  const container = document.getElementById('set-tabs');
  container.innerHTML = '';
  sets.forEach((set, i) => {
    const btn = document.createElement('button');
    btn.className = 'set-tab' + (i === activeIndex ? ' active' : '');
    btn.textContent = set.name;
    btn.addEventListener('click', () => App.switchSet(i));
    container.appendChild(btn);
  });
}

// ---- SHARE MODAL -------------------------------------------

function openShareModal(url) {
  const modal = document.getElementById('shareModal');
  document.getElementById('shareUrlInput').value = url;
  modal.classList.add('open');
}

// ---- HELPERS ------------------------------------------------

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
