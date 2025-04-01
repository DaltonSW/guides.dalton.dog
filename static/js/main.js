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

function toggleCardBorder(cardId) {
  const card = document.getElementById(cardId);
  const checkbox = document.getElementById(cardId + "-check");
  const toggleIcon = document.getElementById(cardId + "-card-toggle-icon")

  if (checkbox.checked) {
    card.classList.remove("border-danger");
    card.classList.add("border-success");
  } else {
    card.classList.remove("border-success");
    card.classList.add("border-danger");
  }
}

function toggleCollapseIcon(cardId) {
  const card = document.getElementById(cardId + "-body");
  const toggleIcon = document.getElementById(cardId + "-card-toggle-icon")

  if (toggleIcon.classList.contains("bi-caret-right-fill")) {
    toggleIcon.classList.remove("bi-caret-right-fill");
    toggleIcon.classList.add("bi-caret-down-fill");
  } else {
    toggleIcon.classList.remove("bi-caret-down-fill");
    toggleIcon.classList.add("bi-caret-right-fill");
  }
}

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

function toggleHideChecked() {
  var checklist = document.querySelector(".checklist");
  if (checklist) {
    checklist.classList.toggle("hide-checked");
  }
}
