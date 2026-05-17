import { createContext, useContext, type Dispatch } from "react";
import type { AppState, ScaleAction } from "../types";

export const ScaleStateContext = createContext<AppState | null>(null);
export const ScaleDispatchContext = createContext<Dispatch<ScaleAction> | null>(null);

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
