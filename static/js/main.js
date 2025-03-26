// Simple cookie helper functions
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Save the current state of checkboxes in a cookie as a JSON string
function saveChecklistState() {
  var state = {};
  document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(function(checkbox) {
    var index = checkbox.getAttribute('data-index');
    state[index] = checkbox.checked;
  });
  setCookie('checklistState', JSON.stringify(state), 7); // persist for 7 days
}

// Load the checklist state from cookie and update checkboxes
function loadChecklistState() {
  var cookie = getCookie('checklistState');
  if (!cookie) return;
  try {
    var state = JSON.parse(cookie);
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(function(checkbox) {
      var index = checkbox.getAttribute('data-index');
      if (state.hasOwnProperty(index)) {
        checkbox.checked = state[index];
      }
    });
  } catch (e) {
    console.error('Error parsing checklist state cookie:', e);
  }
}

// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadChecklistState();

  // Add event listeners to update state on changes
  document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', saveChecklistState);
  });
});
