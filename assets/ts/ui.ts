const BORDER_CLASSES = [
  "border-primary", "border-secondary", "border-tertiary",
  "border-success", "border-danger", "border-warning",
  "border-info", "border-light", "border-dark",
];

export function setCardBorderColor(cardId: string, className: string) {
  const card = document.getElementById(cardId);
  if (!card) return;

  card.classList.remove(...BORDER_CLASSES);
  card.classList.add(className);
}

export function toggleCardBorder(cardId: string) {
  const checkbox = document.getElementById(cardId + "-check") as HTMLInputElement;
  if (!checkbox) return;

  setCardBorderColor(cardId, checkbox.checked ? "border-success" : "border-danger");
}

export function toggleCollapseIcon(cardId: string) {
  const toggleIcon = document.getElementById(cardId + "-card-toggle-icon");
  if (!toggleIcon) return;

  toggleIcon.classList.toggle("bi-caret-right-fill");
  toggleIcon.classList.toggle("bi-caret-down-fill");
}

export function toggleHideChecked() {
  const btn = document.getElementById('toggle-checked-btn');
  if (!btn) return;

  const hiding = !document.body.classList.toggle('hide-checked');
  const icon = btn.querySelector('i')!;

  if (hiding) {
    btn.innerHTML = `<i class="bi bi-eye"></i> Show Checked`;
  } else {
    btn.innerHTML = `<i class="bi bi-eye-slash"></i> Hide Checked`;
  }

  document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(cb => {
    if (!cb.checked) return;

    const row = cb.closest('tr, li, .card');
    if (row) {
      row.classList.toggle('d-none');
    }
  });
}

export function clearAllChecked() {
  if (!confirm('Clear all checked items on this page?')) return;

  const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      cb.checked = false;
      cb.dispatchEvent(new Event('change'));
    }
  });
}
