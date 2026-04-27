import type { AnchorStop, ColorScale, AppState } from "../types";
import { createDefaultTheme } from "./themeDefaults";

function makeAnchor(color: [number, number, number], position: number): AnchorStop {
  return {
    id: crypto.randomUUID(),
    color,
    alpha: 1,
    position,
  };
}

function makeScale(
  name: string,
  midColor: [number, number, number],
): ColorScale {
  return {
    id: crypto.randomUUID(),
    name,
    anchors: [
      makeAnchor([0, 0, 0], 0),
      makeAnchor(midColor, 0.5),
      makeAnchor([1, 1, 1], 1),
    ],
    stepCount: 12,
    interpolationSpace: "oklch",
    hueInterpolation: "shorter",
    paddingStart: 0.05,
    paddingEnd: 0.05,
  };
}

// All mid-point colors are specified in display-p3 gamut
const DEFAULT_SCALES: Array<{ name: string; color: [number, number, number] }> = [
  { name: "red",     color: [1, 0.15, 0.15] },
  { name: "orange",  color: [1, 0.5, 0.05] },
  { name: "gold",    color: [1, 0.72, 0.1] },
  { name: "yellow",  color: [1, 0.88, 0.15] },
  { name: "lime",    color: [0.55, 0.88, 0.15] },
  { name: "green",   color: [0.15, 0.8, 0.3] },
  { name: "teal",    color: [0.1, 0.78, 0.65] },
  { name: "cyan",    color: [0.1, 0.82, 0.95] },
  { name: "blue",    color: [0.2, 0.4, 1] },
  { name: "indigo",  color: [0.3, 0.25, 0.9] },
  { name: "violet",  color: [0.52, 0.25, 0.95] },
  { name: "purple",  color: [0.6, 0.15, 0.85] },
  { name: "fuchsia", color: [0.85, 0.15, 0.85] },
  { name: "pink",    color: [1, 0.35, 0.55] },
  { name: "magenta", color: [0.92, 0.1, 0.55] },
  { name: "gray",    color: [0.45, 0.45, 0.45] },
  { name: "slate",   color: [0.43, 0.45, 0.5] },
];

export function createDefaultScales(): ColorScale[] {
  return DEFAULT_SCALES.map(({ name, color }) => makeScale(name, color));
}

export function createInitialState(): AppState {
  const scales = createDefaultScales();
  const overrides: Record<string, Record<number, { color: [number, number, number]; alpha: number }>> = {};
  for (const s of scales) {
    overrides[s.id] = {};
  }
  return {
    scales,
    selectedScaleId: scales[0].id,
    overrides,
    contrastAlgorithm: "APCA",
    theme: createDefaultTheme(),
  };
}
