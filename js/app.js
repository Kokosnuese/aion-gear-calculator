/* ============================================================
   app.js — Main application controller  v3
   ============================================================ */

const EMPTY_EQUIPMENT = () => ({
  helmet: null, shoulders: null, chest: null, gloves: null,
  pants: null, boots: null, wings: null, weapon: null,
  subWeapon: null, necklace: null, earring1: null, earring2: null,
  ring1: null, ring2: null, belt: null
});

const App = (() => {
  let classId      = 'gladiator';
  let activeSet    = 0;
  let currentSlot  = null;
  let currentItems = [];

  let sets = [
    { name: 'Set 1', equipment: EMPTY_EQUIPMENT() }
  ];

  // ── INIT ────────────────────────────────────────────────────

  function init() {
    populateClassSelector();
    tryLoadFromURL();
    loadFromStorage();
    renderAll();
    bindGlobalEvents();
  }

  function tryLoadFromURL() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const build = deserializeBuild(hash);
    if (!build) return;
    classId   = build.classId;
    sets      = build.sets;
    activeSet = 0;
  }

  function loadFromStorage() {
    try {
      const saved = localStorage.getItem('aiongear_state');
      if (!saved) return;
      const data = JSON.parse(saved);
      if (data.classId) classId = data.classId;
      if (data.sets && data.sets.length) {
        const allItems = [...ITEMS.weapons, ...ITEMS.armor, ...ITEMS.accessories];
        sets = data.sets.map(s => {
          const eq = {};
          Object.entries(s.equipment).forEach(([slot, id]) => {
            eq[slot] = id ? (allItems.find(i => i.id === id) || null) : null;
          });
          return { name: s.name, equipment: eq };
        });
      }
    } catch {}
  }

  function saveToStorage() {
    try {
      const data = {
        classId,
        sets: sets.map(s => ({
          name: s.name,
          equipment: Object.fromEntries(
            Object.entries(s.equipment).map(([slot, item]) => [slot, item ? item.id : null])
          )
        }))
      };
      localStorage.setItem('aiongear_state', JSON.stringify(data));
    } catch {}
  }

  // ── RENDER ──────────────────────────────────────────────────

  function renderAll() {
    // Klassen-Selector im Equipment-Panel Header
    const sel = document.getElementById('classSelector');
    if (sel) sel.value = classId;

    // Klassen-Emblem aktualisieren
    const emblemEl = document.getElementById('classEmblem');
    if (emblemEl) {
      emblemEl.src = CLASS_EMBLEMS[classId] || '';
      emblemEl.alt = classId;
    }

    const eq = currentEquipment();

    buildEquipmentSlots(eq);

    const stats = calculateStats(classId, eq);
    const base  = BASE_STATS[classId] || BASE_STATS.gladiator;
    renderStats(stats, base);

    renderSetBonuses(eq);
    renderSetTabs(sets, activeSet);
  }

  function currentEquipment() {
    return sets[activeSet] ? sets[activeSet].equipment : EMPTY_EQUIPMENT();
  }

  // ── CLASS ───────────────────────────────────────────────────

  function onClassChange() {
    classId = document.getElementById('classSelector').value;
    saveToStorage();
    renderAll();
  }

  function populateClassSelector() {
    const sel = document.getElementById('classSelector');
    if (!sel) return;
    sel.innerHTML = '';
    CLASSES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      sel.appendChild(opt);
    });
    sel.value = classId;
  }

  // ── SETS ────────────────────────────────────────────────────

  function switchSet(index) {
    activeSet = index;
    renderAll();
  }

  function addSet() {
    const n = sets.length + 1;
    sets.push({ name: `Set ${n}`, equipment: EMPTY_EQUIPMENT() });
    activeSet = sets.length - 1;
    saveToStorage();
    renderAll();
  }

  // ── ITEMS ───────────────────────────────────────────────────

  function openModal(slot) {
    currentSlot  = slot;
    currentItems = getItemsForSlot(slot, classId);

    const titleEl  = document.getElementById('modalSlotTitle');
    const searchEl = document.getElementById('itemSearchInput');
    if (titleEl)  titleEl.textContent = SLOT_LABELS[slot] || slot;
    if (searchEl) { searchEl.value = ''; searchEl.focus(); }

    renderItemList(currentItems, slot);
    document.getElementById('itemModal').classList.add('open');
  }

  function closeModal() {
    document.getElementById('itemModal').classList.remove('open');
    hideTooltip();
  }

  function equipItem(slot, item) {
    const eq = currentEquipment();
    eq[slot] = item;
    saveToStorage();
    renderAll();
  }

  function clearSlot(slot) {
    const eq = currentEquipment();
    eq[slot] = null;
    saveToStorage();
    renderAll();
  }

  function filterItems() {
    const term     = document.getElementById('itemSearchInput').value.toLowerCase();
    const filtered = currentItems.filter(i => i.name.toLowerCase().includes(term));
    renderItemList(filtered, currentSlot);
  }

  // ── SHARE ───────────────────────────────────────────────────

  function doShare() {
    const hash = serializeBuild(classId, sets);
    const url  = window.location.origin + window.location.pathname + '#' + hash;
    openShareModal(url);
  }

  // ── EVENTS ──────────────────────────────────────────────────

  function bindGlobalEvents() {
    // Klassen-Dropdown im Panel-Header
    document.getElementById('classSelector')
      .addEventListener('change', onClassChange);

    // Stats-Tab-Buttons (jetzt innerhalb #stats-panel)
    document.querySelectorAll('#stats-tab-bar .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#stats-tab-bar .tab-btn')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content')
          .forEach(t => t.classList.remove('active'));
        const target = document.getElementById('tab-' + btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    // Set-Panel Buttons
    document.getElementById('addSetBtn')
      .addEventListener('click', addSet);
    document.getElementById('saveShareBtn')
      .addEventListener('click', doShare);

    // Item Modal
    document.getElementById('closeModal')
      .addEventListener('click', closeModal);
    document.getElementById('itemModal')
      .addEventListener('click', e => {
        if (e.target === document.getElementById('itemModal')) closeModal();
      });
    document.getElementById('itemSearchInput')
      .addEventListener('input', filterItems);

    // Share Modal
    document.getElementById('closeShareModal')
      .addEventListener('click', () => {
        document.getElementById('shareModal').classList.remove('open');
      });
    document.getElementById('shareModal')
      .addEventListener('click', e => {
        if (e.target === document.getElementById('shareModal'))
          document.getElementById('shareModal').classList.remove('open');
      });
    document.getElementById('copyUrlBtn')
      .addEventListener('click', () => {
        const input = document.getElementById('shareUrlInput');
        input.select();
        navigator.clipboard.writeText(input.value).catch(() => {});
        const btn = document.getElementById('copyUrlBtn');
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });

    // Escape schließt Modals
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal();
        document.getElementById('shareModal').classList.remove('open');
      }
    });
  }

  return { init, openModal, closeModal, equipItem, clearSlot, switchSet, addSet };
})();

document.addEventListener('DOMContentLoaded', App.init);
