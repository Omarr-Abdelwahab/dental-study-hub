import type { AppState } from "./types";

// Increment when seed data changes so returning demo users do not hydrate stale fixtures.
const STORAGE_KEY = "dsh.state.v6";

export interface StateStorage {
  load: () => AppState | null;
  save: (state: AppState) => void;
  clear: () => void;
}

/** Browser persistence adapter. Replace this at the composition root when the API is introduced. */
export const browserStateStorage: StateStorage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AppState) : null;
    } catch {
      return null;
    }
  },
  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The demo remains usable when storage is unavailable or full.
    }
  },
  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be disabled by the browser.
    }
  },
};
