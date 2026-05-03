const STORAGE_KEY = 'checklistState';

export function loadState(): Record<string, boolean> {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function saveState(state: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
