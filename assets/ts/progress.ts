import { setCardBorderColor } from './ui';

export function initCardProgress() {
  document.querySelectorAll("[data-card-id]").forEach(card => {
    const checkboxes = card.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const label = card.querySelector('[data-progress]');

    if (!label) return;

    const updateProgress = () => {
      const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
      label.textContent = `${checked}/${checkboxes.length}`;

      if (checked === checkboxes.length) {
        label.classList.remove("text-bg-danger");
        label.classList.add("text-bg-success");
        setCardBorderColor(card.id, "border-success");
      } else {
        label.classList.remove("text-bg-success");
        label.classList.add("text-bg-danger");
        setCardBorderColor(card.id, "border-danger");
      }
    };

    checkboxes.forEach(cb => cb.addEventListener("change", updateProgress));
    updateProgress();
  });
}

export function initPageProgress() {
  const counter = document.getElementById('page-checkbox-counter');
  if (!counter) return;

  const allCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

  const updatePageProgress = () => {
    const checked = Array.from(allCheckboxes).filter(cb => cb.checked).length;
    counter.textContent = `${checked}/${allCheckboxes.length}`;

    if (checked === allCheckboxes.length) {
      counter.classList.remove("text-bg-danger");
      counter.classList.add("text-bg-success");
    } else {
      counter.classList.remove("text-bg-success");
      counter.classList.add("text-bg-danger");
    }
  };

  allCheckboxes.forEach(cb => cb.addEventListener("change", updatePageProgress));
  updatePageProgress();
}
