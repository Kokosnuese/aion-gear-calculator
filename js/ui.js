/* ============================================================
   ui.js — DOM rendering helpers  (Aion Gear Calculator)
   ============================================================ */

// Slot render order matches grid-area layout
const ALL_SLOTS = [
  'weapon','subWeapon','wings',
  'helmet','necklace',
  'earring1','earring2',
  'chest','shoulders',
  'pants','gloves',
  'ring1','ring2',
  'boots','belt'
];

// ── SLOTS ─────────────────────────────────────────────────

function buildEquipmentSlots(equipment) {
  const layout = document.getElementById('gear-layout');
  // Remove old slots (keep #setBonusArea)
  layout.querySelectorAll('.equip-slot').forEach(el => el.remove());

  ALL_SLOTS.forEach(slot => {
    layout.insertBefore(createSlotEl(slot, equipment[slot]), document.getElementById('setBonusArea'));
  });
}

function createSlotEl(slot, item) {
  const el = document.createElement('div');
  el.className = 'equip-slot' + (item ? ' has-item ' + gradeClass(item) : '');
  el.dataset.slot = slot;

  if (item && item.icon) {
    const img = document.createElement('img');
    img.className = 'slot-item-icon';
    img.src = 'assets/icons/' + item.icon;
    img.alt = item.name;
    img.onerror = () => img.remove();
    el.appendChild(img);
  }

  if (item) {
    const clr = document.createElement('button');
    clr.className = 'slot-clear';
    clr.title = 'Remove';
    clr.textContent = '✕';
    clr.addEventListener('click', e => {
      e.stopPropagation();
      App.clearSlot(slot);
    });
    el.appendChild(clr);
  }

  el.addEventListener('click', () => App.openModal(slot));

  if (item) {
    el.addEventListener('mouseenter', e => showTooltip(item, e));
    el.addEventListener('mousemove',  e => moveTooltip(e));
    el.addEventListener('mouseleave', hideTooltip);
  }
  return el;
}

function gradeClass(item) {
  return item?.grade ? 'grade-' + item.grade : '';
}

// ── STATS PANEL ───────────────────────────────────────────

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
      const row  = document.createElement('div');
      row.className = 'stat-row';

      const base  = baseStats?.[key];
      const bonus = (typeof val === 'number' && typeof base === 'number') ? val - base : 0;
      const formatted = formatStatValue(key, val);

      row.innerHTML = `
        <span class="stat-name">${STAT_NAMES[key] || key}</span>
        <span class="stat-value${bonus > 0 ? ' buffed' : ''}">${formatted}</span>
      `;
      container.appendChild(row);
    });
  });
}

// ── SET BONUS DISPLAY ────────────────────────────────────

function renderSetBonuses(equipment) {
  const area = document.getElementById('setBonusArea');
  if (!area) return;
  area.innerHTML = '';

  const bonuses = computeSetBonuses(equipment);
  if (bonuses.length === 0) return;

  const grouped = {};
  bonuses.forEach(b => {
    if (!grouped[b.setId]) grouped[b.setId] = { name: b.name, bonuses: [] };
    grouped[b.setId].bonuses.push(b);
  });

  Object.values(grouped).forEach(group => {
    const achieved = group.bonuses.filter(b => b.active);
    const el = document.createElement('div');
    if (achieved.length === 0) {
      const b = group.bonuses[0];
      el.className = 'set-bonus-item';
      el.innerHTML = `<span class="set-bonus-name">${group.name}</span>
        <span class="set-bonus-pieces"> (${b.piecesEquipped}/${b.piecesRequired})</span>`;
    } else {
      const last = achieved[achieved.length - 1];
      el.className = 'set-bonus-item set-bonus-active';
      el.innerHTML = `<div class="set-bonus-name">${group.name}</div>
        <div class="set-bonus-pieces">${last.label}</div>`;
    }
    area.appendChild(el);
  });
}

// ── MODAL ────────────────────────────────────────────────

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
      .map(([k, v]) => `${STAT_NAMES[k] || k}: +${v}`)
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

    row.addEventListener('mouseenter', e => showTooltip(item, e));
    row.addEventListener('mousemove',  e => moveTooltip(e));
    row.addEventListener('mouseleave', hideTooltip);

    row.addEventListener('click', () => {
      App.equipItem(slot, item);
      App.closeModal();
    });

    results.appendChild(row);
  });
}

// ── TOOLTIP ───────────────────────────────────────────────

function showTooltip(item, e) {
  const tt = document.getElementById('tooltip');
  const statsHtml = Object.entries(item.stats || {})
    .map(([k, v]) => `<div class="tt-stat"><span>${STAT_NAMES[k]||k}</span><span>+${typeof v==='number'?v.toLocaleString():v}</span></div>`)
    .join('');

  const gradeColor = {
    common: 'var(--grade-common)', rare: 'var(--grade-rare)',
    heroic: 'var(--grade-heroic)', legend: 'var(--grade-legend)',
    fabled: 'var(--grade-fabled)', unique: 'var(--grade-unique)',
    eternal:'var(--grade-eternal)', epic: 'var(--grade-epic)',
    mythic: 'var(--grade-mythic)'
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
  const x  = e.clientX + 16;
  const y  = e.clientY - 10;
  const maxX = window.innerWidth  - tt.offsetWidth  - 12;
  const maxY = window.innerHeight - tt.offsetHeight - 12;
  tt.style.left = Math.min(x, maxX) + 'px';
  tt.style.top  = Math.min(y, maxY) + 'px';
}

function hideTooltip() {
  document.getElementById('tooltip').style.display = 'none';
}

// ── SET TABS ──────────────────────────────────────────────

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

// ── SHARE MODAL ───────────────────────────────────────────

function openShareModal(url) {
  document.getElementById('shareUrlInput').value = url;
  document.getElementById('shareModal').classList.add('open');
}

// ── AMPLIFICATION TAB — icon grid ─────────────────────────

function renderAmpPanel(classId, activeSkillIds, onToggle) {
  const container = document.getElementById('amp-skills');
  if (!container) return;
  container.innerHTML = '';

  const skills = CLASS_SKILLS[classId] || [];
  if (skills.length === 0) {
    container.innerHTML = '<div class="amp-empty">No skills available for this class.</div>';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'amp-icon-grid';

  skills.forEach(skill => {
    const active = activeSkillIds.has(skill.id);

    const cell = document.createElement('div');
    cell.className = 'amp-icon-cell' + (active ? ' amp-active' : '');
    cell.dataset.id = skill.id;
    cell.title = skill.name + '\n' + Object.entries(skill.stats)
      .map(([k, v]) => {
        const sign = (typeof v === 'number' && v > 0) ? '+' : '';
        return `${STAT_NAMES[k] || k}: ${sign}${typeof v === 'number' ? v.toLocaleString('en-US') : v}`;
      }).join(' · ');

    // Icon image — falls back to coloured placeholder if missing
    const img = document.createElement('img');
    img.src = `assets/icons/skills/${skill.id}.png`;
    img.alt = skill.name;
    img.draggable = false;
    img.onerror = function() {
      this.style.display = 'none';
      cell.classList.add('amp-no-icon');
    };
    cell.appendChild(img);

    cell.addEventListener('click', () => onToggle(skill.id));
    grid.appendChild(cell);
  });

  container.appendChild(grid);
}

// ── COMPARISON TAB ────────────────────────────────────────

/**
 * Render the set comparison view.
 * @param {Array}  sets        — all sets from App
 * @param {string} classId     — active class
 * @param {Set}    activeSkillIds
 */
function renderComparison(sets, classId, activeSkillIds) {
  const container = document.getElementById('tab-comparison');
  if (!container) return;

  // Build set selectors + table
  container.innerHTML = '';

  if (sets.length < 2) {
    container.innerHTML = `
      <div class="placeholder-msg">
        <div class="placeholder-icon">⚖</div>
        <p>Create at least two sets to compare them.</p>
      </div>`;
    return;
  }

  // Control row
  const controls = document.createElement('div');
  controls.className = 'comparison-controls';

  const mkSelect = (labelText, id, currentIndex) => {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '6px';

    const lbl = document.createElement('label');
    lbl.textContent = labelText;
    lbl.htmlFor = id;

    const sel = document.createElement('select');
    sel.id = id;
    sets.forEach((s, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = s.name;
      if (i === currentIndex) opt.selected = true;
      sel.appendChild(opt);
    });

    wrap.appendChild(lbl);
    wrap.appendChild(sel);
    return wrap;
  };

  // Remember last chosen indices
  const prevA = parseInt(container.dataset.cmpA ?? '0');
  const prevB = parseInt(container.dataset.cmpB ?? '1');
  const selA = mkSelect('Set A:', 'cmpSelA', prevA);
  const selB = mkSelect('Set B:', 'cmpSelB', prevB);

  controls.appendChild(selA);
  controls.appendChild(selB);
  container.appendChild(controls);

  const tableWrap = document.createElement('div');
  container.appendChild(tableWrap);

  const draw = () => {
    const idxA = parseInt(document.getElementById('cmpSelA').value);
    const idxB = parseInt(document.getElementById('cmpSelB').value);
    container.dataset.cmpA = idxA;
    container.dataset.cmpB = idxB;

    const skillArr = [...activeSkillIds];
    const statsA = calculateStats(classId, sets[idxA].equipment, skillArr);
    const statsB = calculateStats(classId, sets[idxB].equipment, skillArr);

    let html = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Stat</th>
            <th>${sets[idxA].name}</th>
            <th>${sets[idxB].name}</th>
            <th>Δ</th>
          </tr>
        </thead>
        <tbody>
    `;

    Object.entries(STAT_SECTIONS).forEach(([, section]) => {
      html += `<tr class="cmp-section-header"><td colspan="4">${section.title}</td></tr>`;
      section.keys.forEach(key => {
        const vA = statsA[key];
        const vB = statsB[key];
        if (vA === undefined && vB === undefined) return;
        const a  = vA ?? 0;
        const b  = vB ?? 0;

        let deltaHtml = '—';
        let classA = '', classB = '';
        if (typeof a === 'number' && typeof b === 'number') {
          const delta = b - a;
          if (delta > 0)  { deltaHtml = `<span class="cmp-better">+${delta.toLocaleString()}</span>`; classB = 'cmp-better'; classA = 'cmp-worse'; }
          else if (delta < 0) { deltaHtml = `<span class="cmp-worse">${delta.toLocaleString()}</span>`; classA = 'cmp-better'; classB = 'cmp-worse'; }
          else deltaHtml = '=';
        }

        html += `<tr>
          <td>${STAT_NAMES[key] || key}</td>
          <td class="${classA}">${formatStatValue(key, a)}</td>
          <td class="${classB}">${formatStatValue(key, b)}</td>
          <td>${deltaHtml}</td>
        </tr>`;
      });
    });

    html += '</tbody></table>';
    tableWrap.innerHTML = html;
  };

  draw();
  document.getElementById('cmpSelA').addEventListener('change', draw);
  document.getElementById('cmpSelB').addEventListener('change', draw);
}

// ── HELPERS ───────────────────────────────────────────────

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
