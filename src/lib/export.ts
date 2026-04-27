import type { ColorScale, ScaleStep } from "../types";
import { colorFromCoords, colorToHex, colorToP3CssString } from "./color";
import { multiStopInterpolate } from "./interpolation";

interface ResolvedScale {
  name: string;
  steps: ScaleStep[];
  overrides: Record<number, { color: [number, number, number]; alpha: number }>;
}

function resolveScale(
  scale: ColorScale,
  overrides: Record<number, { color: [number, number, number]; alpha: number }>
): ResolvedScale {
  const steps = multiStopInterpolate(
    scale.anchors,
    scale.stepCount,
    scale.interpolationSpace,
    scale.hueInterpolation,
    scale.paddingStart,
    scale.paddingEnd
  );
  return { name: scale.name, steps, overrides };
}

export function generateAllScalesCssExport(
  scales: ColorScale[],
  allOverrides: Record<string, Record<number, { color: [number, number, number]; alpha: number }>>
): string {
  const hexLines: string[] = [];
  const p3Lines: string[] = [];

  for (const scale of scales) {
    const overrides = allOverrides[scale.id] ?? {};
    const { name, steps } = resolveScale(scale, overrides);

    if (hexLines.length > 0) {
      hexLines.push("");
      p3Lines.push("");
    }
    hexLines.push(`  /* ${name} */`);
    p3Lines.push(`    /* ${name} */`);

    for (const step of steps) {
      const override = overrides[step.index];
      const coords = override ? override.color : step.interpolatedColor;
      const alpha = override ? override.alpha : step.interpolatedAlpha;
      const color = colorFromCoords(coords, alpha);
      const varName = `--${name}-${step.index}`;

      hexLines.push(`  ${varName}: ${colorToHex(color)};`);
      p3Lines.push(`    ${varName}: ${colorToP3CssString(color)};`);
    }
  }

  return `:root {
${hexLines.join("\n")}
}

@supports (color: color(display-p3 0 0 0)) {
  :root {
${p3Lines.join("\n")}
  }
}
`;
}
