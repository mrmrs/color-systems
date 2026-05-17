import { useReducer, useEffect, type ReactNode } from "react";
import type { AppState } from "../types";
import { scaleReducer } from "./scaleReducer";
import { createInitialState } from "./defaults";
import { createDefaultTheme } from "./themeDefaults";
import { ScaleDispatchContext, ScaleStateContext } from "./scaleHooks";

const STORAGE_KEY = "color-systems-state";

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      // Basic validation: must have scales array and selectedScaleId
      if (parsed.scales?.length && parsed.selectedScaleId) {
        // Backfill theme if loading state saved before theme system existed
        if (!parsed.theme) {
          parsed.theme = createDefaultTheme();
        }
        return parsed;
      }
    }
  } catch {
    // Corrupted or missing — fall through to default
  }
  return createInitialState();
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function ScaleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(scaleReducer, null, loadState);

  // Persist to localStorage on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <ScaleStateContext value={state}>
      <ScaleDispatchContext value={dispatch}>
        {children}
      </ScaleDispatchContext>
    </ScaleStateContext>
  );
}
