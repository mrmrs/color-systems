import { useEffect } from "react";
import type { AppState } from "../types";
import { multiStopInterpolate } from "../lib/interpolation";
import { colorFromCoords, colorToHex, colorToP3CssString } from "../lib/color";

const STYLE_ID = "color-system-live-vars";

export function useLiveCssVariables(state: AppState) {
  useEffect(() => {
    const hexLines: string[] = [];
    const p3Lines: string[] = [];

    // ── Scale variables ──
    for (const scale of state.scales) {
      const overrides = state.overrides[scale.id] ?? {};
      const steps = multiStopInterpolate(
        scale.anchors,
        scale.stepCount,
        scale.interpolationSpace,
        scale.hueInterpolation,
        scale.paddingStart,
        scale.paddingEnd
      );

      for (const step of steps) {
        const override = overrides[step.index];
        const coords = override ? override.color : step.interpolatedColor;
        const alpha = override ? override.alpha : step.interpolatedAlpha;
        const color = colorFromCoords(coords, alpha);
        const varName = `--${scale.name}-${step.index}`;

        hexLines.push(`  ${varName}: ${colorToHex(color)};`);
        p3Lines.push(`    ${varName}: ${colorToP3CssString(color)};`);
      }
    }

    // ── Semantic theme tokens ──
    // These reference the scale variables, so they resolve dynamically
    const { mode, tokens } = state.theme;
    const semanticLines: string[] = [];
    semanticLines.push("");
    semanticLines.push("  /* Semantic theme tokens */");
    for (const token of tokens) {
      const ref = token[mode];
      const varName = `--${token.id}`;
      const scaleVar = `var(--${ref.scale}-${ref.step})`;
      semanticLines.push(`  ${varName}: ${scaleVar};`);
    }

    const css = `:root {\n${hexLines.join("\n")}\n${semanticLines.join("\n")}\n}\n@supports (color: color(display-p3 0 0 0)) {\n  :root {\n${p3Lines.join("\n")}\n  }\n}`;

    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = css;
  }, [state.scales, state.overrides, state.theme]);
}
