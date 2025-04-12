document.addEventListener('DOMContentLoaded', function() {
  // Retrieve stored state from localStorage (if any)
  const storedState = localStorage.getItem('checklistState');
  const checklistState: Record<string, boolean> = storedState ? JSON.parse(storedState) : {};

  // Get all checkboxes on the page
  const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

  // Update each checkbox based on stored state
  checkboxes.forEach(function(checkbox: HTMLInputElement) {
    const id = checkbox.id;

    if (checklistState.hasOwnProperty(id)) {
      checkbox.checked = checklistState[id];
    }

    if (checkbox.checked) {
      if (id.endsWith("-check")) {
        const cardId = id.replace(/-check$/, "");
        setCardBorderColor(cardId, "border-success");
      }
    }

    // Listen for changes and update state in localStorage
    checkbox.addEventListener('change', function() {
      checklistState[id] = checkbox.checked;
      localStorage.setItem('checklistState', JSON.stringify(checklistState));
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-card-id]").forEach(card => {
    const checkboxes = card.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const label = card.querySelector('[data-progress]');

    if (!label) return;

    const updateProgress = () => {
      const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
      label.textContent = `${checked} / ${checkboxes.length}`;

      if (`${checked}` === `${checkboxes.length}`) {
        label.classList.remove("text-bg-danger");
        label.classList.add("text-bg-success");

        setCardBorderColor(card.id, "border-success");

        card.classList.remove("border-danger");
        card.classList.add("border-success");
      } else {
        label.classList.remove("text-bg-success");
        label.classList.add("text-bg-danger");

        setCardBorderColor(card.id, "border-danger");
      }

    };

    checkboxes.forEach(cb => cb.addEventListener("change", updateProgress));
    updateProgress();
  });
});

function setCardBorderColor(cardId: string, className: string) {
  const card = document.getElementById(cardId);

  if (!card) return;

  card.classList.remove("border-primary");
  card.classList.remove("border-secondary");
  card.classList.remove("border-tertiary");
  card.classList.remove("border-success");
  card.classList.remove("border-danger");
  card.classList.remove("border-warning");
  card.classList.remove("border-info");
  card.classList.remove("border-light");
  card.classList.remove("border-dark");

  card.classList.add(className);
}

function toggleCardBorder(cardId: string) {
  const checkbox = document.getElementById(cardId + "-check") as HTMLInputElement;

  if (!checkbox) return;

  if (checkbox.checked) {
    setCardBorderColor(cardId, "border-success");
  } else {
    setCardBorderColor(cardId, "border-danger");
  }
}

window.toggleCardBorder = toggleCardBorder;


function toggleCollapseIcon(cardId: string) {
  const toggleIcon = document.getElementById(cardId + "-card-toggle-icon");

  if (!toggleIcon) return;

  if (toggleIcon.classList.contains("bi-caret-right-fill")) {
    toggleIcon.classList.remove("bi-caret-right-fill");
    toggleIcon.classList.add("bi-caret-down-fill");
  } else {
    toggleIcon.classList.remove("bi-caret-down-fill");
    toggleIcon.classList.add("bi-caret-right-fill");
  }
}

window.toggleCollapseIcon = toggleCollapseIcon;
