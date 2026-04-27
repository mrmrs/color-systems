export interface AnchorStop {
  id: string;
  color: [number, number, number]; // P3 [r, g, b] 0-1
  alpha: number;
  position: number; // 0-1, where on the scale this stop sits
}

export interface ScaleStep {
  index: number;
  interpolatedColor: [number, number, number];
  interpolatedAlpha: number;
  override: [number, number, number] | null;
  overrideAlpha: number | null;
}

export interface ColorScale {
  id: string;
  name: string;
  anchors: AnchorStop[];
  stepCount: number;
  interpolationSpace: string;
  hueInterpolation: "shorter" | "longer" | "increasing" | "decreasing";
  paddingStart: number; // 0-0.5, shifts first step away from the start anchor
  paddingEnd: number;   // 0-0.5, shifts last step away from the end anchor
}

export type PickerMode = "oklch" | "hsl" | "rgb";

export type ScaleAction =
  | { type: "ADD_ANCHOR"; scaleId: string; anchor: AnchorStop }
  | { type: "REMOVE_ANCHOR"; scaleId: string; anchorId: string }
  | { type: "MOVE_ANCHOR"; scaleId: string; anchorId: string; position: number }
  | { type: "UPDATE_ANCHOR_COLOR"; scaleId: string; anchorId: string; color: [number, number, number]; alpha?: number }
  | { type: "SET_STEP_COUNT"; scaleId: string; stepCount: number }
  | { type: "SET_INTERPOLATION_SPACE"; scaleId: string; space: string }
  | { type: "SET_HUE_INTERPOLATION"; scaleId: string; hue: ColorScale["hueInterpolation"] }
  | { type: "SET_PADDING"; scaleId: string; paddingStart?: number; paddingEnd?: number }
  | { type: "OVERRIDE_STEP"; scaleId: string; stepIndex: number; color: [number, number, number]; alpha?: number }
  | { type: "RESET_STEP"; scaleId: string; stepIndex: number }
  | { type: "RESET_ALL_STEPS"; scaleId: string }
  | { type: "ADD_SCALE"; scale: ColorScale }
  | { type: "REMOVE_SCALE"; scaleId: string }
  | { type: "RENAME_SCALE"; scaleId: string; name: string }
  | { type: "SELECT_SCALE"; scaleId: string }
  | { type: "SET_CONTRAST_ALGORITHM"; algorithm: ContrastAlgorithm }
  | { type: "RESET_DEFAULTS" };

export type ContrastAlgorithm = "APCA" | "WCAG21";

export type ThemeMode = "light" | "dark";

/** A reference to a specific step in a specific scale: "blue-4" */
export interface TokenRef {
  scale: string; // scale name, e.g. "blue"
  step: number;  // step index, e.g. 4
}

/** A semantic token with its current assignment + candidate alternatives */
export interface SemanticToken {
  id: string;           // e.g. "primary"
  label: string;        // display name
  group: string;        // grouping: "bg", "text", "accent", "border", "feedback"
  light: TokenRef;      // assignment in light mode
  dark: TokenRef;       // assignment in dark mode
  candidates: TokenRef[]; // quick-cycle alternatives
}

export interface ThemeState {
  mode: ThemeMode;
  tokens: SemanticToken[];
}

export type ThemeAction =
  | { type: "SET_THEME_MODE"; mode: ThemeMode }
  | { type: "SET_TOKEN_VALUE"; tokenId: string; mode: ThemeMode; ref: TokenRef }
  | { type: "CYCLE_TOKEN"; tokenId: string; direction: 1 | -1 }
  | { type: "ADD_CANDIDATE"; tokenId: string; ref: TokenRef }
  | { type: "REMOVE_CANDIDATE"; tokenId: string; index: number }
  | { type: "RESET_THEME" };

export type ScaleAction =
  | { type: "ADD_ANCHOR"; scaleId: string; anchor: AnchorStop }
  | { type: "REMOVE_ANCHOR"; scaleId: string; anchorId: string }
  | { type: "MOVE_ANCHOR"; scaleId: string; anchorId: string; position: number }
  | { type: "UPDATE_ANCHOR_COLOR"; scaleId: string; anchorId: string; color: [number, number, number]; alpha?: number }
  | { type: "SET_STEP_COUNT"; scaleId: string; stepCount: number }
  | { type: "SET_INTERPOLATION_SPACE"; scaleId: string; space: string }
  | { type: "SET_HUE_INTERPOLATION"; scaleId: string; hue: ColorScale["hueInterpolation"] }
  | { type: "SET_PADDING"; scaleId: string; paddingStart?: number; paddingEnd?: number }
  | { type: "OVERRIDE_STEP"; scaleId: string; stepIndex: number; color: [number, number, number]; alpha?: number }
  | { type: "RESET_STEP"; scaleId: string; stepIndex: number }
  | { type: "RESET_ALL_STEPS"; scaleId: string }
  | { type: "ADD_SCALE"; scale: ColorScale }
  | { type: "REMOVE_SCALE"; scaleId: string }
  | { type: "RENAME_SCALE"; scaleId: string; name: string }
  | { type: "SELECT_SCALE"; scaleId: string }
  | { type: "SET_CONTRAST_ALGORITHM"; algorithm: ContrastAlgorithm }
  | { type: "RESET_DEFAULTS" }
  | ThemeAction;

export interface AppState {
  scales: ColorScale[];
  selectedScaleId: string;
  overrides: Record<string, Record<number, { color: [number, number, number]; alpha: number }>>;
  contrastAlgorithm: ContrastAlgorithm;
  theme: ThemeState;
}
