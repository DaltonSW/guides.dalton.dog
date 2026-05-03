/*
 * DOM contract (selectors expected by this script):
 *   IDs:    {cardId}-check, {cardId}-card-toggle-icon, {cardId}-body
 *   Attrs:  data-card-id, data-progress
 *   Classes: border-danger/border-success, text-bg-danger/text-bg-success
 */

import { loadState, saveState } from './state';
import { initCardProgress, initPageProgress } from './progress';
import { toggleCardBorder, toggleCollapseIcon, toggleHideChecked, clearAllChecked, setCardBorderColor } from './ui';

// Expose functions needed by onclick handlers in shortcode templates
window.toggleCardBorder = toggleCardBorder;
window.toggleCollapseIcon = toggleCollapseIcon;
window.toggleHideChecked = toggleHideChecked;
window.clearAllChecked = clearAllChecked;

document.addEventListener('DOMContentLoaded', function () {
  // Restore checkbox state from localStorage
  const checklistState = loadState();
  const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    const id = checkbox.id;

    if (checklistState.hasOwnProperty(id)) {
      checkbox.checked = checklistState[id];
    }

    // Restore card border for single-checkbox "checkable" cards
    if (checkbox.checked && id.endsWith("-check")) {
      setCardBorderColor(id.replace(/-check$/, ""), "border-success");
    }

    // Persist changes on toggle
    checkbox.addEventListener('change', function () {
      checklistState[id] = checkbox.checked;
      saveState(checklistState);
    });
  });

  // Initialize progress badges after checkbox state is restored
  initCardProgress();
  initPageProgress();
});
