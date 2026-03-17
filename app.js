// ── Placeholder interaction handlers ──
// These are stubs ready to be wired up to real data/state.

// ── Week header rendering ──
const DAY_ABBR   = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let weekOffset = 0;

function getSundayOfWeek() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay() + weekOffset * 7);
  sunday.setHours(0, 0, 0, 0);
  return sunday;
}

function renderWeekHeaders() {
  const sunday = getSundayOfWeek();
  document.querySelectorAll('.day-header').forEach((el, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    el.textContent = `${DAY_ABBR[i]} ${MONTH_ABBR[d.getMonth()]} ${d.getDate()}`;
  });
}

// Filter button: toggle dropdown (Location) or placeholder for others
function toggleDropdown(dropdownId, btn) {
  const dropdown = document.getElementById(dropdownId);
  const isOpen = dropdown.classList.contains('open');
  closeAll();
  if (!isOpen) {
    dropdown.classList.add('open');
    btn.classList.add('active');
    document.getElementById('backdrop').classList.add('active');
  }
}

// Placeholder for Org / Type / Time / My Orgs filter buttons
function placeholderFilter(filterName) {
  // TODO: open filter panel for filterName
  console.log(`[placeholder] Filter clicked: ${filterName}`);
}

// Week navigation
function placeholderNav(direction) {
  weekOffset += direction === 'next' ? 1 : -1;
  renderWeekHeaders();
}

// Placeholder for search input
function placeholderSearch(value) {
  // TODO: filter visible events by search term
  console.log(`[placeholder] Search: "${value}"`);
}

// Placeholder for role toggle (Student / Officer)
function placeholderToggleRole() {
  const btn = document.getElementById('role-toggle-btn');
  btn.classList.toggle('left');
  // TODO: switch UI between Student and Officer views
  const isStudent = btn.classList.contains('left');
  console.log(`[placeholder] Role switched to: ${isStudent ? 'Student' : 'Officer'}`);
}

// Open an event detail popup
function openPopup(popupId, eventEl) {
  closeAll();
  if (!popupId) {
    // TODO: dynamically build popup from event data
    console.log('[placeholder] openPopup — no popupId provided, wire up event data');
    return;
  }
  const popup = document.getElementById(popupId);
  if (!popup) return;
  popup.classList.add('open');
  document.getElementById('backdrop').classList.add('active');
}

// Close a specific popup
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) popup.classList.remove('open');
  document.getElementById('backdrop').classList.remove('active');
}

// Close all open dropdowns and popups
function closeAll() {
  document.querySelectorAll('.filter-dropdown.open').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.event-popup.open').forEach(p => p.classList.remove('open'));
  document.getElementById('backdrop').classList.remove('active');
}

// Initialise on load
renderWeekHeaders();
