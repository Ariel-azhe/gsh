// ── Placeholder interaction handlers ──
// These are stubs ready to be wired up to real data/state.

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

// Week navigation — delegates to FullCalendar
function placeholderNav(direction) {
  if (direction === 'next') calendar.next();
  else calendar.prev();
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

// ── FullCalendar init ──

// Returns a Date for a given day-of-week index (0=Sun) and time in the current week
function weekDate(dayIndex, hour, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + dayIndex);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
  initialView: 'timeGridWeek',
  headerToolbar: false,   // we use our own nav buttons
  firstDay: 0,            // week starts Sunday
  slotMinTime: '09:00:00',
  slotMaxTime: '23:00:00',
  allDaySlot: false,
  height: 'auto',
  slotDuration: '01:00:00',
  events: [
    {
      title: 'Open Bar',
      start: weekDate(1, 18),
      end:   weekDate(1, 19),
      extendedProps: { popupId: 'popup-open-bar', meta: '6–7 · coffee club' }
    },
    {
      title: 'Craft Event',
      start: weekDate(2, 13, 30),
      end:   weekDate(2, 14, 30),
      extendedProps: { meta: '1:30–2:30 · lakeside' }
    },
    {
      title: 'Study Break',
      start: weekDate(2, 14),
      end:   weekDate(2, 14, 30),
      extendedProps: { meta: '2:00–2:30 · graduate college' }
    },
    {
      title: 'Rec Tennis',
      start: weekDate(3, 20),
      end:   weekDate(3, 22),
      extendedProps: { meta: '8:00–10:00 · meadows' }
    },
    {
      title: 'Club Meeting',
      start: weekDate(5, 15),
      end:   weekDate(5, 17),
      extendedProps: { meta: '3:00–5:00 · TBD' }
    }
  ],
  eventContent: function(arg) {
    return {
      html: `<div class="fc-event-title-custom">${arg.event.title}</div>` +
            `<div class="fc-event-meta-custom">${arg.event.extendedProps.meta || ''}</div>`
    };
  },
  eventClick: function(info) {
    info.jsEvent.preventDefault();
    const popupId = info.event.extendedProps.popupId || null;
    openPopup(popupId, null);
  }
});

calendar.render();
