import Color from "colorjs.io";
import type { AnchorStop, ScaleStep } from "../types";
import { colorFromCoords, colorToP3Coords } from "./color";

export function multiStopInterpolate(
  anchors: AnchorStop[],
  stepCount: number,
  interpolationSpace: string,
  hueInterpolation: string = "shorter",
  paddingStart: number = 0,
  paddingEnd: number = 0
): ScaleStep[] {
  if (anchors.length === 0) return [];

  const sorted = [...anchors].sort((a, b) => a.position - b.position);

  if (sorted.length === 1) {
    return Array.from({ length: stepCount }, (_, i) => ({
      index: i,
      interpolatedColor: [...sorted[0].color] as [number, number, number],
      interpolatedAlpha: sorted[0].alpha,
      override: null,
      overrideAlpha: null,
    }));
  }

  // Pre-build range functions for each adjacent pair
  const ranges: Array<(t: number) => Color> = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const c1 = colorFromCoords(sorted[i].color, sorted[i].alpha);
    const c2 = colorFromCoords(sorted[i + 1].color, sorted[i + 1].alpha);
    ranges.push(
      c1.range(c2, {
        space: interpolationSpace,
        outputSpace: "p3",
        hue: hueInterpolation,
      })
    );
  }

  const steps: ScaleStep[] = [];

  for (let i = 0; i < stepCount; i++) {
    // Map step index to padded range: instead of 0..1, use paddingStart..(1-paddingEnd)
    const raw = stepCount === 1 ? 0.5 : i / (stepCount - 1);
    const t = paddingStart + raw * (1 - paddingStart - paddingEnd);

    // Find which segment t falls into
    let segIndex = 0;
    let localT = 0;

    if (t <= sorted[0].position) {
      segIndex = 0;
      localT = 0;
    } else if (t >= sorted[sorted.length - 1].position) {
      segIndex = ranges.length - 1;
      localT = 1;
    } else {
      for (let s = 0; s < sorted.length - 1; s++) {
        if (t >= sorted[s].position && t <= sorted[s + 1].position) {
          segIndex = s;
          const span = sorted[s + 1].position - sorted[s].position;
          localT = span === 0 ? 0 : (t - sorted[s].position) / span;
          break;
        }
      }
    }

    const interpolated = ranges[segIndex](localT);
    const coords = colorToP3Coords(interpolated);
    const alpha = interpolated.alpha;

    steps.push({
      index: i,
      interpolatedColor: coords,
      interpolatedAlpha: alpha,
      override: null,
      overrideAlpha: null,
    });
  }

  return steps;
}
