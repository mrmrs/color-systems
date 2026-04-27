import { createContext, useContext, useReducer, useEffect, type Dispatch, type ReactNode } from "react";
import type { AppState, ScaleAction } from "../types";
import { scaleReducer } from "./scaleReducer";
import { createInitialState } from "./defaults";
import { createDefaultTheme } from "./themeDefaults";

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

const ScaleStateContext = createContext<AppState | null>(null);
const ScaleDispatchContext = createContext<Dispatch<ScaleAction> | null>(null);

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

export function useScaleState(): AppState {
  const ctx = useContext(ScaleStateContext);
  if (!ctx) throw new Error("useScaleState must be used within ScaleProvider");
  return ctx;
}

export function useScaleDispatch(): Dispatch<ScaleAction> {
  const ctx = useContext(ScaleDispatchContext);
  if (!ctx) throw new Error("useScaleDispatch must be used within ScaleProvider");
  return ctx;
}

export function useSelectedScale() {
  const state = useScaleState();
  return state.scales.find((s) => s.id === state.selectedScaleId) ?? state.scales[0];
}

export function useSelectedOverrides() {
  const state = useScaleState();
  return state.overrides[state.selectedScaleId] ?? {};
}
