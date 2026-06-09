/* ============================================================
   app.js — Main application controller  (Aion Gear Calculator)
   ============================================================ */

const EMPTY_EQUIPMENT = () => ({
  helmet:null, shoulders:null, chest:null, gloves:null,
  pants:null,  boots:null,    wings:null,  weapon:null,
  subWeapon:null, necklace:null, earring1:null, earring2:null,
  ring1:null,  ring2:null,   belt:null
});

const App = (() => {
  let classId        = 'gladiator';
  let activeSet      = 0;
  let currentSlot    = null;
  let currentItems   = [];
  let activeSkillIds = new Set();

  let sets = [{ name: 'Set 1', equipment: EMPTY_EQUIPMENT() }];

  // ── INIT ─────────────────────────────────────────────────

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
    classId        = build.classId;
    sets           = build.sets;
    activeSet      = 0;
    activeSkillIds = new Set(build.activeSkillIds || []);
  }

  function loadFromStorage() {
    try {
      const saved = localStorage.getItem('aiongear_v2');
      if (!saved) return;
      const data = JSON.parse(saved);
      if (data.classId) classId = data.classId;
      if (Array.isArray(data.skills)) activeSkillIds = new Set(data.skills);
      if (data.sets?.length) {
        const allItems = [...ITEMS.weapons, ...ITEMS.armor, ...ITEMS.accessories];
        sets = data.sets.map(s => {
          const eq = {};
          Object.entries(s.equipment).forEach(([slot, id]) => {
            eq[slot] = id ? (allItems.find(i => i.id === id) || null) : null;
          });
          return { name: s.name, equipment: eq };
        });
      }
    } catch (_) {}
  }

  function saveToStorage() {
    try {
      localStorage.setItem('aiongear_v2', JSON.stringify({
        classId,
        skills: [...activeSkillIds],
        sets: sets.map(s => ({
          name: s.name,
          equipment: Object.fromEntries(
            Object.entries(s.equipment).map(([slot, item]) => [slot, item?.id ?? null])
          )
        }))
      }));
    } catch (_) {}
  }

  // ── RENDER ───────────────────────────────────────────────

  function renderAll() {
    // Sync class selector
    const sel = document.getElementById('classSelector');
    if (sel) sel.value = classId;

    // Emblem
    const emblem = document.getElementById('classEmblem');
    if (emblem) { emblem.src = CLASS_EMBLEMS[classId] || ''; emblem.alt = classId; }

    const eq    = currentEquipment();
    const stats = calculateStats(classId, eq, [...activeSkillIds]);
    const base  = BASE_STATS[classId] || BASE_STATS.gladiator;

    buildEquipmentSlots(eq);
    renderStats(stats, base);
    renderSetBonuses(eq);
    renderSetTabs(sets, activeSet);
    renderAmpPanel(classId, activeSkillIds, toggleSkill);

    // Re-render comparison tab if it's currently visible
    const cmpTab = document.getElementById('tab-comparison');
    if (cmpTab && cmpTab.classList.contains('active')) {
      renderComparison(sets, classId, activeSkillIds);
    }
  }

  function currentEquipment() {
    return sets[activeSet]?.equipment ?? EMPTY_EQUIPMENT();
  }

  // ── CLASS ────────────────────────────────────────────────

  function onClassChange() {
    classId = document.getElementById('classSelector').value;
    activeSkillIds.clear();
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

  // ── SKILLS ───────────────────────────────────────────────

  function toggleSkill(skillId) {
    if (activeSkillIds.has(skillId)) activeSkillIds.delete(skillId);
    else activeSkillIds.add(skillId);
    saveToStorage();
    renderAll();
  }

  // ── SETS ─────────────────────────────────────────────────

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

  // ── ITEMS ────────────────────────────────────────────────

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
    currentEquipment()[slot] = item;
    saveToStorage();
    renderAll();
  }

  function clearSlot(slot) {
    currentEquipment()[slot] = null;
    saveToStorage();
    renderAll();
  }

  function filterItems() {
    const term     = document.getElementById('itemSearchInput').value.toLowerCase();
    const filtered = currentItems.filter(i => i.name.toLowerCase().includes(term));
    renderItemList(filtered, currentSlot);
  }

  // ── SHARE ────────────────────────────────────────────────

  function doShare() {
    const hash = serializeBuild(classId, sets, [...activeSkillIds]);
    const url  = location.origin + location.pathname + '#' + hash;
    openShareModal(url);
  }

  // ── EVENTS ───────────────────────────────────────────────

  function bindGlobalEvents() {
    document.getElementById('classSelector').addEventListener('change', onClassChange);

    // Tab switching
    document.querySelectorAll('#stats-tab-bar .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#stats-tab-bar .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        const target = document.getElementById('tab-' + btn.dataset.tab);
        if (target) target.classList.add('active');

        // Render comparison when tab becomes active
        if (btn.dataset.tab === 'comparison') {
          renderComparison(sets, classId, activeSkillIds);
        }
      });
    });

    document.getElementById('addSetBtn').addEventListener('click', addSet);
    document.getElementById('saveShareBtn').addEventListener('click', doShare);

    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('itemModal').addEventListener('click', e => {
      if (e.target === document.getElementById('itemModal')) closeModal();
    });
    document.getElementById('itemSearchInput').addEventListener('input', filterItems);

    document.getElementById('closeShareModal').addEventListener('click', () => {
      document.getElementById('shareModal').classList.remove('open');
    });
    document.getElementById('shareModal').addEventListener('click', e => {
      if (e.target === document.getElementById('shareModal'))
        document.getElementById('shareModal').classList.remove('open');
    });

    document.getElementById('copyUrlBtn').addEventListener('click', () => {
      const input = document.getElementById('shareUrlInput');
      input.select();
      navigator.clipboard.writeText(input.value).catch(() => {});
      const btn = document.getElementById('copyUrlBtn');
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });

    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      closeModal();
      document.getElementById('shareModal').classList.remove('open');
    });
  }

  return { init, openModal, closeModal, equipItem, clearSlot, switchSet, addSet };
})();

document.addEventListener('DOMContentLoaded', () =>
  AionDB.init().then(App.init)
);
