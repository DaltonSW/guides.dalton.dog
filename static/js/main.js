document.addEventListener('DOMContentLoaded', function() {
  // Retrieve stored state from localStorage (if any)
  let storedState = localStorage.getItem('checklistState');
  let checklistState = storedState ? JSON.parse(storedState) : {};

  // Get all checkboxes on the page
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Update each checkbox based on stored state
  checkboxes.forEach(function(checkbox) {
    const id = checkbox.id;
    if (checklistState.hasOwnProperty(id)) {
      checkbox.checked = checklistState[id];
    }

    // Listen for changes and update state in localStorage
    checkbox.addEventListener('change', function() {
      checklistState[id] = checkbox.checked;
      localStorage.setItem('checklistState', JSON.stringify(checklistState));
    });
  });
});


function toggleCollapse(id) {
  var section = document.getElementById(id + "-list");
  if (section) {
    if (section.style.display === "none") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }
}
