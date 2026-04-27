import type { AppState, ScaleAction, SemanticToken } from "../types";
import { createInitialState } from "./defaults";
import { createDefaultTheme } from "./themeDefaults";

export function scaleReducer(state: AppState, action: ScaleAction): AppState {
  switch (action.type) {
    case "ADD_ANCHOR": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId
            ? { ...s, anchors: [...s.anchors, action.anchor].sort((a, b) => a.position - b.position) }
            : s
        ),
        // Clear overrides when anchors change
        overrides: { ...state.overrides, [action.scaleId]: {} },
      };
    }

    case "REMOVE_ANCHOR": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId
            ? { ...s, anchors: s.anchors.filter((a) => a.id !== action.anchorId) }
            : s
        ),
        overrides: { ...state.overrides, [action.scaleId]: {} },
      };
    }

    case "MOVE_ANCHOR": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId
            ? {
                ...s,
                anchors: s.anchors
                  .map((a) => (a.id === action.anchorId ? { ...a, position: Math.max(0, Math.min(1, action.position)) } : a))
                  .sort((a, b) => a.position - b.position),
              }
            : s
        ),
      };
    }

    case "UPDATE_ANCHOR_COLOR": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId
            ? {
                ...s,
                anchors: s.anchors.map((a) =>
                  a.id === action.anchorId
                    ? { ...a, color: action.color, alpha: action.alpha ?? a.alpha }
                    : a
                ),
              }
            : s
        ),
      };
    }

    case "SET_STEP_COUNT": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId ? { ...s, stepCount: action.stepCount } : s
        ),
        overrides: { ...state.overrides, [action.scaleId]: {} },
      };
    }

    case "SET_INTERPOLATION_SPACE": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId ? { ...s, interpolationSpace: action.space } : s
        ),
      };
    }

    case "SET_HUE_INTERPOLATION": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId ? { ...s, hueInterpolation: action.hue } : s
        ),
      };
    }

    case "SET_PADDING": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId
            ? {
                ...s,
                paddingStart: action.paddingStart ?? s.paddingStart,
                paddingEnd: action.paddingEnd ?? s.paddingEnd,
              }
            : s
        ),
      };
    }

    case "OVERRIDE_STEP": {
      const scaleOverrides = { ...(state.overrides[action.scaleId] || {}) };
      scaleOverrides[action.stepIndex] = {
        color: action.color,
        alpha: action.alpha ?? 1,
      };
      return {
        ...state,
        overrides: { ...state.overrides, [action.scaleId]: scaleOverrides },
      };
    }

    case "RESET_STEP": {
      const scaleOverrides = { ...(state.overrides[action.scaleId] || {}) };
      delete scaleOverrides[action.stepIndex];
      return {
        ...state,
        overrides: { ...state.overrides, [action.scaleId]: scaleOverrides },
      };
    }

    case "RESET_ALL_STEPS": {
      return {
        ...state,
        overrides: { ...state.overrides, [action.scaleId]: {} },
      };
    }

    case "ADD_SCALE": {
      return {
        ...state,
        scales: [...state.scales, action.scale],
        selectedScaleId: action.scale.id,
        overrides: { ...state.overrides, [action.scale.id]: {} },
      };
    }

    case "REMOVE_SCALE": {
      const remaining = state.scales.filter((s) => s.id !== action.scaleId);
      const newOverrides = { ...state.overrides };
      delete newOverrides[action.scaleId];
      return {
        ...state,
        scales: remaining,
        selectedScaleId: remaining.length > 0 ? remaining[0].id : "",
        overrides: newOverrides,
      };
    }

    case "RENAME_SCALE": {
      return {
        ...state,
        scales: state.scales.map((s) =>
          s.id === action.scaleId ? { ...s, name: action.name } : s
        ),
      };
    }

    case "SELECT_SCALE": {
      return { ...state, selectedScaleId: action.scaleId };
    }

    case "SET_CONTRAST_ALGORITHM": {
      return { ...state, contrastAlgorithm: action.algorithm };
    }

    case "RESET_DEFAULTS": {
      return createInitialState();
    }

    // ── Theme actions ──

    case "SET_THEME_MODE": {
      return {
        ...state,
        theme: { ...state.theme, mode: action.mode },
      };
    }

    case "SET_TOKEN_VALUE": {
      return {
        ...state,
        theme: {
          ...state.theme,
          tokens: state.theme.tokens.map((tok) =>
            tok.id === action.tokenId
              ? { ...tok, [action.mode]: action.ref }
              : tok
          ),
        },
      };
    }

    case "CYCLE_TOKEN": {
      return {
        ...state,
        theme: {
          ...state.theme,
          tokens: state.theme.tokens.map((tok) => {
            if (tok.id !== action.tokenId) return tok;
            const mode = state.theme.mode;
            const current = tok[mode];
            const cands = tok.candidates;
            if (cands.length === 0) return tok;
            const curIdx = cands.findIndex(
              (c) => c.scale === current.scale && c.step === current.step
            );
            const nextIdx = (curIdx + action.direction + cands.length) % cands.length;
            return { ...tok, [mode]: cands[nextIdx] } as SemanticToken;
          }),
        },
      };
    }

    case "ADD_CANDIDATE": {
      return {
        ...state,
        theme: {
          ...state.theme,
          tokens: state.theme.tokens.map((tok) =>
            tok.id === action.tokenId
              ? {
                  ...tok,
                  candidates: [
                    ...tok.candidates,
                    action.ref,
                  ].filter(
                    (c, i, arr) =>
                      arr.findIndex((x) => x.scale === c.scale && x.step === c.step) === i
                  ),
                }
              : tok
          ),
        },
      };
    }

    case "REMOVE_CANDIDATE": {
      return {
        ...state,
        theme: {
          ...state.theme,
          tokens: state.theme.tokens.map((tok) =>
            tok.id === action.tokenId
              ? { ...tok, candidates: tok.candidates.filter((_, i) => i !== action.index) }
              : tok
          ),
        },
      };
    }

    case "RESET_THEME": {
      return {
        ...state,
        theme: createDefaultTheme(),
      };
    }

    default:
      return state;
  }
}
